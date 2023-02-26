import { Heading, Link, Flex, Box } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import SendPasswordConfirmationForm from './SendPasswordConfirmationForm';
import styles from './auth.styles';

const SendPasswordConfirmation = () => {
  return (
    <Flex sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Heading sx={styles.heading}>Send password confirmation</Heading>
        <SendPasswordConfirmationForm />
        <Box sx={styles.footer}>
          <Link as={ReactRouterLink} to={'/login'}>
            Go to the login page
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default SendPasswordConfirmation;
