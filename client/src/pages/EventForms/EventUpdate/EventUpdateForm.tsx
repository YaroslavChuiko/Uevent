import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Flex,
  Textarea,
  Switch,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateEventMutation } from '~/store/api/event-slice';
import { updateSchema } from '~/validation/event';
import type { IUpdate } from '~/validation/event';
import type { Event } from '~/types/event';
import EventFormPoster from './EventFormPoster';
import PlacesSearch from '~/components/PlacesSearch/PlacesSearch';
import AsyncSelectFormat from '~/components/Select/AsyncSelectFormat';
import AsyncSelectTheme from '~/components/Select/AsyncSelectTheme';
import { SelectOptionData } from '~/types/select-option-data';
import styles from '../event-form.styles';
import layoutStyles from '~/components/Layout/layout.styles';

type IProps = {
  event: Event;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const getSelectDefaultOption = ({ id, name }: { id: number; name: string }) => {
  return {
    id,
    label: name,
    value: name,
  };
};

const EventUpdateForm = ({ event, setEdit }: IProps) => {
  const [update, { isLoading }] = useUpdateEventMutation();
  const { picturePath, id, companyId, ...defaultValues } = event;

  const [date, setDate] = useState(defaultValues.date.slice(0, 16));
  const [publishDate, setPublishDate] = useState(defaultValues.publishDate.slice(0, 16));
  const [isFree, setIsFree] = useState<boolean>(Number(defaultValues.price) === 0);
  const [isPublishNow, setIsPublishNow] = useState<boolean>(new Date(defaultValues.publishDate) <= new Date());
  const [format, setFormat] = useState<SelectOptionData | null>(getSelectDefaultOption(event.format));
  const [theme, setTheme] = useState<SelectOptionData | null>(getSelectDefaultOption(event.theme));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      ...defaultValues,
      date: new Date(defaultValues.date),
      publishDate: new Date(defaultValues.publishDate),
      price: Number(defaultValues.price),
    },
  });

  const { handler: updateHandler } = useRequestHandler<IUpdate & { id: number }>({
    f: update,
    successMsg: "You've successfully updated the event",
  });

  const onSubmit = async (data: IUpdate) => {
    await updateHandler({ ...data, id });
  };

  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setValue('date', new Date(e.target.value), { shouldValidate: true });
  };

  const onPublishDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPublishDate(e.target.value);
    setValue('publishDate', new Date(e.target.value), { shouldValidate: true });
  };

  const onFreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFree(e.target.checked);
    setValue('price', 0, { shouldValidate: true });
  };

  const onPublishNowChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublishNow(e.target.checked);
    setValue('publishDate', new Date(), { shouldValidate: true });
    setPublishDate(new Date().toJSON().slice(0, 16));
  };

  useEffect(() => {
    if (format) {
      setValue('formatId', format.id, { shouldValidate: true });
    }
  }, [format]);

  useEffect(() => {
    if (theme) {
      setValue('themeId', theme.id, { shouldValidate: true });
    }
  }, [theme]);

  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Flex flexDir="row">
            <Flex flexDir="column" flexGrow="0">
              <EventFormPoster event={event} />
            </Flex>
            <Flex justify="flex-end" flexGrow="1" marginLeft="10px">
              <Button onClick={() => setEdit(false)} variant="outline">
                Go Back
              </Button>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="name" {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea id="description" placeholder="description" {...register('description')} />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Free</FormLabel>
                <Switch onChange={onFreeChange} defaultChecked={isFree} />
              </FormControl>
              {!isFree && (
                <FormControl isInvalid={!!errors.price}>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="price"
                    {...register('price', { valueAsNumber: true })}
                  />
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>
              )}
              <FormControl isInvalid={!!errors.ticketsAvailable}>
                <FormLabel htmlFor="ticketsAvailable">Amount of tickets</FormLabel>
                <Input
                  id="ticketsAvailable"
                  type="number"
                  placeholder="amount of tickets"
                  {...register('ticketsAvailable', { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.ticketsAvailable?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.isNotificationsOn}>
                <FormLabel htmlFor="isNotificationsOn">
                  Do you want to receive notifications about new visitors of the event?
                </FormLabel>
                <Switch id="isNotificationsOn" {...register('isNotificationsOn')} />
                <FormErrorMessage>{errors.isNotificationsOn?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.isPublic}>
                <FormLabel htmlFor="isPublic">Can everybody see the list of event visitors?</FormLabel>
                <Switch id="isPublic" {...register('isPublic')} />
                <FormErrorMessage>{errors.isPublic?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.date}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input id="date" type="datetime-local" value={date} onChange={onDateChange} />
                <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Publish now</FormLabel>
                <Switch onChange={onPublishNowChange} defaultChecked={isPublishNow} />
              </FormControl>
              {!isPublishNow && (
                <FormControl isInvalid={!!errors.publishDate}>
                  <FormLabel htmlFor="publishDate">Publish date</FormLabel>
                  <Input id="publishDate" type="datetime-local" value={publishDate} onChange={onPublishDateChange} />
                  <FormErrorMessage>{errors.publishDate?.message}</FormErrorMessage>
                </FormControl>
              )}
              <PlacesSearch
                lat={defaultValues.latitude}
                lng={defaultValues.longitude}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <FormControl isInvalid={!!errors.formatId}>
                <FormLabel htmlFor="formatId">Format</FormLabel>
                <AsyncSelectFormat format={format} setFormat={setFormat} />
                <FormErrorMessage>Input format please</FormErrorMessage>
              </FormControl>
              <Input hidden {...register('formatId', { valueAsNumber: true })} />
              <FormControl isInvalid={!!errors.themeId}>
                <FormLabel htmlFor="themeId">Theme</FormLabel>
                <AsyncSelectTheme theme={theme} setTheme={setTheme} />
                <FormErrorMessage>Input theme please</FormErrorMessage>
              </FormControl>
              <Input hidden {...register('themeId', { valueAsNumber: true })} />
              <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default EventUpdateForm;
