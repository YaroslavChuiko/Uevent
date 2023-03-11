import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import PageAlert from '~/components/PageAlert/PageAlert';

const SuccessfulPayment = () => {
  return (
    <PageAlert status="success" title="Your payment was successful!" message="You have now subscribed to the event.">
      <Button colorScheme="green" as={RouterLink} to="/">
        Go home
      </Button>
    </PageAlert>
  );
};

export default SuccessfulPayment;
