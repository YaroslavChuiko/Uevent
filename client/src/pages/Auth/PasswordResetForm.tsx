import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '~/validation/auth';
import type { IResetPassword } from '~/validation/auth';
import { useResetPasswordMutation } from '~/store/api/auth-slice';
import { useSearchParams } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';
import { useAppSelector } from '~/hooks/use-app-selector';
import styles from './auth.styles';

const PasswordReset = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  let [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('confirmToken') || useAppSelector((state) => state.profile).accessToken;
  const { toast } = useCustomToast();

  const onSubmit = async (data: IResetPassword) => {
    try {
      await resetPassword({ ...data, confirmToken }).unwrap();
      toast('Password was successfully updated', 'success');
      reset();
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
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
        <Button type="submit" colorScheme="blue" sx={styles.button} isLoading={isLoading} loadingText="Submitting">
          Reset password
        </Button>
      </VStack>
    </form>
  );
};

export default PasswordReset;
