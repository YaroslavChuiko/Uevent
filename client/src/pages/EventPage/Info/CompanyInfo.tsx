import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import Loader from '~/components/Loader/Loader';
import { AVATAR_PATH } from '~/consts/avatar';
import useRequestHandler from '~/hooks/use-request-handler';
import { useSubscribeMutation, useUnsubscribeMutation } from '~/store/api/company-slice';
import { Company } from '~/types/company';
import useCustomToast from '~/hooks/use-custom-toast';
import styles from '../event.styles';
import IError from '~/types/error';
import { useAppSelector } from '~/hooks/use-app-selector';
import { useGetUsersQuery } from '~/store/api/user-slice';

type PropType = {
  company: Company;
};

const CompanyInfo = ({ company }: PropType) => {
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

  return (
    <Card mt="8" w="100%" sx={styles.mainInfo}>
      <VStack p="8" spacing="4">
        <CardHeader>
          <Heading size="lg">About the company</Heading>
        </CardHeader>
        {areUsersLoading ? (
          <Loader isFullScreen={false} />
        ) : (
          <>
            <LinkBox as="div">
              <LinkOverlay href={`/companies/${company.id}`}>
                <VStack spacing="8">
                  <Avatar size="xl" bgColor="tertiary" name={company.name} src={AVATAR_PATH(company.picturePath)} />
                  <Heading mt="4" size="md">
                    {company.name.toUpperCase()}
                  </Heading>
                </VStack>
              </LinkOverlay>
            </LinkBox>
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
          </>
        )}
      </VStack>
    </Card>
  );
};

export default CompanyInfo;
