import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '~/validation/auth';
import type { ILogin } from '~/validation/auth';
import { useLoginMutation } from '~/store/api/authSlice';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const onSubmit = async (data: ILogin) => {
    try {
      await login(data).unwrap();
      navigate('/');
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.login}>
        <FormLabel htmlFor="login">Login</FormLabel>
        <Input id="login" placeholder="login" {...register('login')} />
        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="password" type="password" {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading} loadingText="Submitting" spinnerPlacement="end">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
