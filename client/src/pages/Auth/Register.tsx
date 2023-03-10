import { Heading, Link, Text, Flex, Box, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import styles from './auth.styles';
import layoutStyles from '~/components/Layout/layout.styles';

const Register = () => {
  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
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
    </Flex>
  );
};

export default Register;
