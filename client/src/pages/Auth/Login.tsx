import { Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <>
      <Heading>Log in to your account</Heading>
      <LoginForm />
      <Text>
        Don't have an account yet?
        <Link as={ReactRouterLink} to={'/register'}>
          Create one
        </Link>
      </Text>
      <Text>
        Forgot your password?
        <Link as={ReactRouterLink} to={'/confirm-password-reset'}>
          Reset it
        </Link>
      </Text>
    </>
  );
};

export default Login;
