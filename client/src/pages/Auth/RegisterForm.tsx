import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '~/validation/auth';
import type { IRegister } from '~/validation/auth';
import { useRegisterMutation } from '~/store/api/authSlice';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';

const RegisterForm = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const onSubmit = async (data: IRegister) => {
    try {
      await registerMutation(data).unwrap();
      toast('You are successfully registered. Please check your email to confirm it', 'success');
      navigate('/login');
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.login} isRequired>
        <FormLabel htmlFor="login">Login</FormLabel>
        <Input id="login" placeholder="login" {...register('login')} />
        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.email} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
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
      <FormControl isInvalid={!!errors.fullName} isRequired>
        <FormLabel htmlFor="fullName">Full name</FormLabel>
        <Input id="fullName" placeholder="full name" {...register('fullName')} />
        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading} loadingText="Submitting" spinnerPlacement="end">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
