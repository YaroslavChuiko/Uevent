import { Heading, Link, Text, Flex, Box, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import styles from './auth.styles';
import layoutStyles from '~/components/Layout/layout.styles';

const Login = () => {
  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
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
    </Flex>
  );
};

export default Login;
