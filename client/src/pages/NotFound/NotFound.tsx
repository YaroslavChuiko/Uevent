import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import PageAlert from '~/components/PageAlert/PageAlert';

const NotFound = () => {
  return (
    <PageAlert
      status="warning"
      title="404 - Page not found!"
      message="Whoops, the page you are looking for was not found."
    >
      <Button colorScheme="orange" as={RouterLink} to="/">
        Go home
      </Button>
    </PageAlert>
  );
};

export default NotFound;
