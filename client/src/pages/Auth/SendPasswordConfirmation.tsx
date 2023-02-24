import { Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import SendPasswordConfirmationForm from './SendPasswordConfirmationForm';

const SendPasswordConfirmation = () => {
  return (
    <>
      <Heading>Send password confirmation</Heading>
      <SendPasswordConfirmationForm />
      <Text>
        <Link as={ReactRouterLink} to={'/login'}>
          Go to the login page
        </Link>
      </Text>
    </>
  );
};

export default SendPasswordConfirmation;
