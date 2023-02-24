import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordConfirmationSchema } from '~/validation/auth';
import type { ISendPasswordConfirmation } from '~/validation/auth';
import { useSendPasswordConfirmationMutation } from '~/store/api/authSlice';
import useCustomToast from '~/hooks/use-custom-toast';

const SendPasswordConfirmationForm = () => {
  const [sendPasswordConfirmation, { isLoading }] = useSendPasswordConfirmationMutation();
  const { toast } = useCustomToast();

  const onSubmit = async (data: ISendPasswordConfirmation) => {
    try {
      await sendPasswordConfirmation(data).unwrap();
      toast(`Password reset confirmation sent to email ${data.email}`, 'success');
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISendPasswordConfirmation>({
    resolver: zodResolver(sendPasswordConfirmationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading} loadingText="Submitting" spinnerPlacement="end">
        Request password reset
      </Button>
    </form>
  );
};

export default SendPasswordConfirmationForm;
