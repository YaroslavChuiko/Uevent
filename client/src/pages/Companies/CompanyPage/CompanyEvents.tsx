import { Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import EventList from '~/pages/Home/Events/EventList';
import EventSearch from '~/pages/Home/Events/EventSearch';

const CompanyEvents = () => {
  const { id: companyId } = useParams();
  const [search, setSearch] = useState('');

  return (
    <Container sx={{ mt: '20px' }}>
      <VStack spacing="4" align="flex-start">
        <Heading as="h3" fontSize="24px">
          Your company's events
        </Heading>
        <EventSearch setSearch={setSearch} />
      </VStack>
      <EventList q={search} dateRange={null} companyId={Number(companyId)} itemsPerPage={3} />;
    </Container>
  );
};

export default CompanyEvents;
