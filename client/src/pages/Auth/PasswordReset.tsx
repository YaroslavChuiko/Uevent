import { Heading, Link, Flex, Box, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';
import styles from './auth.styles';
import layoutStyles from '~/components/Layout/layout.styles';

const PasswordReset = () => {
  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
      <Card sx={styles.card}>
        <CardHeader>
          <Heading sx={styles.heading}>Reset password</Heading>
        </CardHeader>
        <CardBody>
          <PasswordResetForm />
          <Box sx={styles.footer}>
            <Link as={ReactRouterLink} to={'/login'} sx={styles.link}>
              Go to the login page
            </Link>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default PasswordReset;
