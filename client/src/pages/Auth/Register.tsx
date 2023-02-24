import { Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <>
      <Heading>Create an account</Heading>
      <RegisterForm />
      <Text>
        Already have an account?
        <Link as={ReactRouterLink} to={'/login'}>
          Log in
        </Link>
      </Text>
    </>
  );
};

export default Register;
