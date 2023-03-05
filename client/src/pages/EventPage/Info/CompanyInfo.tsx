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
import { useGetCompanySubscribersQuery } from '~/store/api/company-slice';
import { Company } from '~/types/company';
import styles from '../event.styles';

type PropType = {
  company: Company;
};

const CompanyInfo = ({ company }: PropType) => {
  const { data, isLoading } = useGetCompanySubscribersQuery({
    companyId: company.id,
  });

  const usersCount = Intl.NumberFormat('en', { notation: 'compact' }).format(data?.totalCount as number);

  return (
    <Card mt="8" w="100%" sx={styles.mainInfo}>
      <VStack p="8" spacing="4">
        <CardHeader>
          <Heading size="lg">About the company</Heading>
        </CardHeader>
        {isLoading ? (
          <Loader isFullScreen={false} />
        ) : (
          <>
            <LinkBox as="div">
              <LinkOverlay href={`companies/${company.id}`}>
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
              <Button colorScheme="purple">Subscribe</Button>
            </HStack>
          </>
        )}
      </VStack>
    </Card>
  );
};

export default CompanyInfo;
