import { Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';

const PasswordReset = () => {
  return (
    <>
      <Heading>Reset password</Heading>
      <PasswordResetForm />
      <Text>
        <Link as={ReactRouterLink} to={'/login'}>
          Go to the login page
        </Link>
      </Text>
    </>
  );
};

export default PasswordReset;
