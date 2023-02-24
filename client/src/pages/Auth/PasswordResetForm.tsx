import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '~/validation/auth';
import type { IResetPassword } from '~/validation/auth';
import { useResetPasswordMutation } from '~/store/api/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';

const PasswordReset = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('confirmToken');
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const onSubmit = async (data: IResetPassword) => {
    try {
      await resetPassword({ ...data, confirmToken }).unwrap();
      toast('Password was successfully updated', 'success');
      navigate('/login');
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.password} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="password" type="password" {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.passwordConfirm} isRequired>
        <FormLabel htmlFor="passwordConfirm">Password confirmation</FormLabel>
        <Input
          id="passwordConfirm"
          placeholder="password confirmation"
          type="password"
          {...register('passwordConfirm')}
        />
        <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading} loadingText="Submitting" spinnerPlacement="end">
        Reset password
      </Button>
    </form>
  );
};

export default PasswordReset;
