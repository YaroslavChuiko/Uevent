import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateCompanyMutation } from '~/store/api/company-slice';
import { updateSchema } from '~/validation/companies';
import type { IUpdate } from '~/validation/companies';
import type { Company } from '~/types/company';
import CompanyFormAvatar from './CompanyFormAvatar';
import PlacesSearch from '~/components/PlacesSearch/PlacesSearch';
import styles from '../company-form.styles';
import layoutStyles from '~/components/Layout/layout.styles';

type IProps = {
  company: Company;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompanyUpdateForm = ({ company, setEdit }: IProps) => {
  const [update, { isLoading: isUpdateLoading }] = useUpdateCompanyMutation();
  const { picturePath, id, stripeId, isAccountCompleted, ...defaultValues } = company;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues,
  });

  const { handler: updateHandler } = useRequestHandler<IUpdate & { id: number }>({
    f: update,
    successMsg: "You've successfully updated the company",
  });

  const onSubmit = async (data: IUpdate) => {
    await updateHandler({ ...data, id });
  };

  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Wrap flexDir="row">
            <Flex flexDir="column" flexGrow="0">
              <CompanyFormAvatar company={company} />
            </Flex>
            <Flex justify="flex-end" flexGrow="1">
              <Button onClick={() => setEdit(false)} variant="outline">
                Go Back
              </Button>
            </Flex>
          </Wrap>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="name" {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="email" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <PlacesSearch
                lat={defaultValues.latitude}
                lng={defaultValues.longitude}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <Button type="submit" w="200px" colorScheme="blue" isLoading={isUpdateLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default CompanyUpdateForm;
