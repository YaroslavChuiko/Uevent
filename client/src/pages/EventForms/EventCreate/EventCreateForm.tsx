import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
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
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateEventMutation } from '~/store/api/event-slice';
import { createSchema } from '~/validation/event';
import type { ICreate } from '~/validation/event';
import PlacesSearch from '~/components/PlacesSearch/PlacesSearch';
import AsyncSelectCompany from '~/components/Select/AsyncSelectCompany';
import AsyncSelectFormat from '~/components/Select/AsyncSelectFormat';
import AsyncSelectTheme from '~/components/Select/AsyncSelectTheme';
import { SelectOptionData } from '~/types/select-option-data';
import styles from '../event-form.styles';
import layoutStyles from '~/components/Layout/layout.styles';

const EventCreateForm = () => {
  const [create, { isLoading }] = useCreateEventMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const [isFree, setIsFree] = useState<boolean>(false);
  const [isPublishNow, setIsPublishNow] = useState<boolean>(true);
  const [company, setCompany] = useState<SelectOptionData | null>(null);
  const [format, setFormat] = useState<SelectOptionData | null>(null);
  const [theme, setTheme] = useState<SelectOptionData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      publishDate: new Date(),
    },
  });

  const onSubmit = async (data: ICreate) => {
    try {
      const { id } = await create(data).unwrap();
      toast("You've successfully created new event", 'success');
      navigate(`/events/${id}`);
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const onFreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFree(e.target.checked);
    setValue('price', 0, { shouldValidate: true });
  };

  const onPublishNowChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublishNow(e.target.checked);
    reset({
      publishDate: new Date(),
    });
  };

  useEffect(() => {
    if (company) {
      setValue('companyId', company.id, { shouldValidate: true });
    }
  }, [company]);

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
          <Heading sx={styles.heading}>Create new event</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4">
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="name" {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description} isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea id="description" placeholder="description" {...register('description')} />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Free</FormLabel>
                <Switch onChange={onFreeChange} />
              </FormControl>
              {!isFree && (
                <FormControl isInvalid={!!errors.price} isRequired>
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
              <FormControl isInvalid={!!errors.ticketsAvailable} isRequired>
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
              <FormControl isInvalid={!!errors.date} isRequired>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  type="datetime-local"
                  {...register('date', {
                    valueAsDate: true,
                  })}
                />
                <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Publish now</FormLabel>
                <Switch onChange={onPublishNowChange} defaultChecked />
              </FormControl>
              {!isPublishNow && (
                <FormControl isInvalid={!!errors.publishDate} isRequired>
                  <FormLabel htmlFor="publishDate">Publish date</FormLabel>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    {...register('publishDate', {
                      valueAsDate: true,
                    })}
                  />
                  <FormErrorMessage>{errors.publishDate?.message}</FormErrorMessage>
                </FormControl>
              )}
              <PlacesSearch register={register} setValue={setValue} errors={errors} />
              <FormControl isInvalid={!!errors.companyId} isRequired>
                <FormLabel htmlFor="companyId">Company</FormLabel>
                <AsyncSelectCompany company={company} setCompany={setCompany} />
                <FormErrorMessage>Input company name please</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.formatId} isRequired>
                <FormLabel htmlFor="formatId">Format</FormLabel>
                <AsyncSelectFormat format={format} setFormat={setFormat} />
                <FormErrorMessage>Input format please</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.themeId} isRequired>
                <FormLabel htmlFor="themeId">Theme</FormLabel>
                <AsyncSelectTheme theme={theme} setTheme={setTheme} />
                <FormErrorMessage>Input theme please</FormErrorMessage>
              </FormControl>
              <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
                Create
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default EventCreateForm;
