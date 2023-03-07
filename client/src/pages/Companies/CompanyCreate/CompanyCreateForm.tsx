import { Button, Card, CardBody, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCompanyMutation } from '~/store/api/company-slice';
import { createSchema } from '~/validation/companies';
import type { ICreate } from '~/validation/companies';
import PlacesSearch from '~/components/PlacesSearch/PlacesSearch';

const CompanyCreateForm = () => {
  const [create, { isLoading }] = useCreateCompanyMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: ICreate) => {
    try {
      const { id } = await create(data).unwrap();
      toast("You've successfully created new company", 'success');
      navigate(`/companies/${id}`);
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  return (
    <Card variant="outline">
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
            <PlacesSearch register={register} setValue={setValue} errors={errors} />
            <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
              Create
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default CompanyCreateForm;
