import { Heading, Link, Text, Flex, Box } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import styles from './auth.styles';

const Login = () => {
  return (
    <Flex sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Heading sx={styles.heading}>Log in to your account</Heading>
        <LoginForm />
        <Box sx={styles.footer}>
          <Text sx={styles.footerText}>
            Don't have an account yet?{' '}
            <Link as={ReactRouterLink} to={'/register'}>
              Create one
            </Link>
          </Text>
          <Text sx={styles.footerText}>
            Forgot your password?{' '}
            <Link as={ReactRouterLink} to={'/confirm-password-reset'}>
              Reset it
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
