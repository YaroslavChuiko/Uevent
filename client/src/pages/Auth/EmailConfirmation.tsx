import { useEffect } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useConfirmEmailMutation } from '~/store/api/auth-slice';
import Loader from '~/components/Loader/Loader';
import PageAlert from '~/components/PageAlert/PageAlert';
import IError from '~/types/error';

const AlertSuccess = () => {
  return (
    <PageAlert
      status="success"
      title="Email address confirmed"
      message="You have successfully confirm your email address. You can now login to the application."
    >
      <Button colorScheme="green" as={RouterLink} to="/login">
        Login
      </Button>
    </PageAlert>
  );
};

const AlertError = ({ message }: { message: string }) => {
  return (
    <PageAlert status="error" title="Confirmation error!" message={message}>
      <Button colorScheme="red" as={RouterLink} to="/">
        Go home
      </Button>
    </PageAlert>
  );
};

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('confirmToken');
  const [comfirmEmail, { isLoading, isError, error }] = useConfirmEmailMutation();

  useEffect(() => {
    comfirmEmail({ confirmToken });
  }, [confirmToken]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <AlertError message={(error as IError).data.message} />;
  }

  return <AlertSuccess />;
};

export default EmailConfirmation;
