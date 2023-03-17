import { Box, Card, CardBody, CardHeader, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './auth.styles';
import Logo from './Logo';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <>
      <Logo />
      <Card sx={styles.card}>
        <CardHeader>
          <Heading sx={styles.heading}>Create an account</Heading>
        </CardHeader>
        <CardBody>
          <RegisterForm />
          <Box sx={styles.footer}>
            <Text sx={styles.footerText}>
              Already have an account?{' '}
              <Link as={ReactRouterLink} to={'/login'} sx={styles.link}>
                Log in
              </Link>
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default Register;
