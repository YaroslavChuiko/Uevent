import { Box, Card, CardBody, CardHeader, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './auth.styles';
import LoginForm from './LoginForm';
import Logo from './Logo';

const Login = () => {
  return (
    <>
      <Logo />
      <Card sx={styles.card}>
        <CardHeader>
          <Heading sx={styles.heading}>Log in to your account</Heading>
        </CardHeader>
        <CardBody>
          <LoginForm />
          <Box sx={styles.footer}>
            <Text sx={styles.footerText}>
              Don't have an account yet?{' '}
              <Link as={ReactRouterLink} to={'/register'} sx={styles.link}>
                Create one
              </Link>
            </Text>
            <Text sx={styles.footerText}>
              Forgot your password?{' '}
              <Link as={ReactRouterLink} to={'/confirm-password-reset'} sx={styles.link}>
                Reset it
              </Link>
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default Login;
