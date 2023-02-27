import { Avatar, Box, Card, CardBody, Heading, Stack, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { useGetUserQuery } from '~/store/api/user-slice';
import Loader from '~/components/Loader/Loader';
import type { Company } from '~/types/company';
import { AVATAR_PATH } from '~/consts/avatar';

const CompanyCard = ({ company }: { company: Company }) => {
  const { data: user, isLoading: userIsLoading, error: userError } = useGetUserQuery(company.userId);

  if (userError) {
    return null;
  }

  if (userIsLoading) {
    return <Loader />;
  }

  return (
    <LinkBox>
      <Card maxW="sm" direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" padding={'10px'}>
        <Avatar size="2xl" name={company.name} src={AVATAR_PATH(company.picturePath)} />
        <CardBody>
          <Stack mt="1" spacing="2">
            <Heading as="h3" noOfLines={2} fontSize="18px">
              <LinkOverlay href={`/companies/${company.id}`}>{company.name}</LinkOverlay>
            </Heading>
            <Text>{company.email}</Text>
            <Box fontSize="14px">
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
