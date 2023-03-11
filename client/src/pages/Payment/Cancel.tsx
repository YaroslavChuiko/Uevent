import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import PageAlert from '~/components/PageAlert/PageAlert';

const CancelledPayment = () => {
  return (
    <PageAlert
      status="info"
      title="Your payment was cancelled."
      message="You may now review other events to subsribe to."
    >
      <Button colorScheme="blue" as={RouterLink} to="/">
        Go home
      </Button>
    </PageAlert>
  );
};

export default CancelledPayment;
