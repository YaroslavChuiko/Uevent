import { Button } from '@chakra-ui/react';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateStripeAccountMutation, useLazyGetStripeAccountQuery } from '~/store/api/company-slice';
import { Company } from '~/types/company';

type PropsTypes = {
  company: Company;
};

const StripeButtons = ({ company }: PropsTypes) => {
  const { id, stripeId, isAccountCompleted } = company;
  const [createAccount, { isLoading: isCreateLoading }] = useCreateStripeAccountMutation();
  const [getAccount, { isLoading: isAccountLoading }] = useLazyGetStripeAccountQuery();
  const { toast } = useCustomToast();

  const createAccountHandler = async () => {
    try {
      const result = await createAccount({ id }).unwrap();
      window.open(result.url, '_blank');
    } catch (err: any) {
      toast(err.message || err.data.message, 'error');
    }
  };

  const getAccountHandler = async () => {
    try {
      const result = await getAccount({ id: company.id }).unwrap();
      window.open(result.url, '_blank');
    } catch (err: any) {
      toast(err.message || err.data.message, 'error');
    }
  };

  return (
    <>
      {!stripeId || !isAccountCompleted ? (
        <Button onClick={createAccountHandler} isLoading={isCreateLoading} colorScheme="purple">
          Connect Stripe
        </Button>
      ) : (
        <Button onClick={getAccountHandler} isLoading={isAccountLoading} variant="outline" colorScheme="purple">
          Stripe Account
        </Button>
      )}
    </>
  );
};

export default StripeButtons;
