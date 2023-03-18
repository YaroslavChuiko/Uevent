import { Avatar, Box, Card, CardBody, Heading, Stack, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { useGetUserQuery } from '~/store/api/user-slice';
import CompanyCardSkeleton from './CompanyCardSkeleton';
import type { Company } from '~/types/company';
import { AVATAR_PATH } from '~/consts/avatar';
import styles from './company-card.styles';
import { Link as ReactRouterLink } from 'react-router-dom';

const CompanyCard = ({ company }: { company: Company }) => {
  const { data: user, isLoading: userIsLoading, error: userError } = useGetUserQuery(company.userId);

  if (userError) {
    return null;
  }

  if (userIsLoading) {
    return <CompanyCardSkeleton />;
  }

  return (
    <LinkBox>
      <Card sx={styles.card}>
        <Avatar size="2xl" name={company.name} src={AVATAR_PATH(company.picturePath)} />
        <CardBody sx={styles.cardBody}>
          <Stack sx={styles.stack}>
            <Heading sx={styles.heading}>
              <LinkOverlay as={ReactRouterLink} to={`/companies/${company.id}`}>
                {company.name}
              </LinkOverlay>
            </Heading>
            <Text sx={styles.text}>{company.email}</Text>
            <Box sx={styles.founder}>
              Founder <Avatar size="xs" ml="3px" name={user?.fullName} src={AVATAR_PATH(user?.picturePath)} /> @
              {user?.login}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

export default CompanyCard;
