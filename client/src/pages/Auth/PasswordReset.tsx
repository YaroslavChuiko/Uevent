import { Heading, Link, Flex, Box } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';
import styles from './auth.styles';

const PasswordReset = () => {
  return (
    <Flex sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Heading sx={styles.heading}>Reset password</Heading>
        <PasswordResetForm />
        <Box sx={styles.footer}>
          <Link as={ReactRouterLink} to={'/login'}>
            Go to the login page
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default PasswordReset;
