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

type IProps = {
  company: Company;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompanyUpdateForm = ({ company, setEdit }: IProps) => {
  const [update, { isLoading }] = useUpdateCompanyMutation();
  const { picturePath, id, ...defaultValues } = company;

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
    <Card variant="outline">
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="0">
            <CompanyFormAvatar company={company} />
          </Flex>
          <Flex justify="flex-end" flexGrow="1">
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
            <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
              Submit
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default CompanyUpdateForm;
