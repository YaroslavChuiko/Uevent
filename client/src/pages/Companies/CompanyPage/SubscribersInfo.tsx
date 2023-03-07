import { Button, HStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/use-app-selector';
import { useSubscribeMutation, useUnsubscribeMutation } from '~/store/api/company-slice';
import useRequestHandler from '~/hooks/use-request-handler';
import useCustomToast from '~/hooks/use-custom-toast';
import Loader from '~/components/Loader/Loader';
import IError from '~/types/error';
import type { Company } from '~/types/company';
import { useGetUsersQuery } from '~/store/api/user-slice';

type IProps = {
  company: Company;
};

const SubscribersInfo = ({ company }: IProps) => {
  const { user } = useAppSelector((state) => state.profile);
  const { data, isLoading: areUsersLoading } = useGetUsersQuery({
    companyId: company.id,
  });

  const [subscribe, { isLoading: isSubsribeLoading, error: subError }] = useSubscribeMutation();
  const { handler: subscribeHandler } = useRequestHandler<number>({
    f: subscribe,
    successMsg: "You've successfully subscribed to the company!",
  });
  const [unsubscribe, { isLoading: isUnsubsribeLoading, error: unsubError }] = useUnsubscribeMutation();
  const { handler: unsubscribeHandler } = useRequestHandler<number>({
    f: unsubscribe,
    successMsg: "You've successfully unsubscribed from the company!",
  });

  const { toast } = useCustomToast();
  const error = subError || unsubError;
  if (error) {
    toast((error as IError).data.message, 'error');
  }

  const usersCount = Intl.NumberFormat('en', { notation: 'compact' }).format(data?.totalCount as number);
  const isUserSubscribed = data?.users.find((u) => u.id === Number(user.id));

  if (areUsersLoading) {
    return <Loader isFullScreen={false} />;
  }

  return (
    <HStack spacing="12">
      <Stat>
        <StatNumber textAlign="center">{usersCount}</StatNumber>
        <StatLabel>followers</StatLabel>
      </Stat>
      {!isUserSubscribed ? (
        <Button
          isDisabled={!user.id}
          colorScheme="purple"
          isLoading={isSubsribeLoading}
          onClick={() => subscribeHandler(company.id)}
        >
          Subscribe
        </Button>
      ) : (
        <Button
          variant="outline"
          colorScheme="red"
          isLoading={isUnsubsribeLoading}
          onClick={() => unsubscribeHandler(company.id)}
        >
          Unsubscribe
        </Button>
      )}
    </HStack>
  );
};

export default SubscribersInfo;
