import { Heading, Link, Text, Flex, Box } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import styles from './auth.styles';

const Register = () => {
  return (
    <Flex sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Heading sx={styles.heading}>Create an account</Heading>
        <RegisterForm />
        <Box sx={styles.footer}>
          <Text sx={styles.footerText}>
            Already have an account?{' '}
            <Link as={ReactRouterLink} to={'/login'}>
              Log in
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
