import { Heading, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import EventList from '~/pages/Home/Events/EventList';
import EventSearch from '~/pages/Home/Events/EventSearch';
import { addYears } from 'date-fns';

type IProps = {
  isCurUserOwner: boolean;
};

const CompanyEvents = ({ isCurUserOwner }: IProps) => {
  const { id: companyId } = useParams();
  const [search, setSearch] = useState('');

  const now = new Date();

  return (
    <Container sx={{ mt: '20px' }}>
      <VStack spacing="4" align="flex-start">
        <Heading as="h3" fontSize="24px">
          This company's events
        </Heading>
        <EventSearch setSearch={setSearch} />
      </VStack>
      <Tabs variant="soft-rounded" colorScheme="blue" mt="20px">
        <TabList>
          <Tab>Upcoming</Tab>
          <Tab>Past</Tab>
          {isCurUserOwner && <Tab>Not published</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <EventList q={search} dateRange={null} companyId={Number(companyId)} itemsPerPage={3} />
          </TabPanel>
          <TabPanel>
            <EventList
              q={search}
              dateRange={{ from: addYears(now, -1), to: now }}
              companyId={Number(companyId)}
              itemsPerPage={3}
            />
          </TabPanel>
          {isCurUserOwner && (
            <TabPanel>
              <EventList
                q={search}
                dateRange={null}
                companyId={Number(companyId)}
                itemsPerPage={3}
                notPublished={true}
              />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default CompanyEvents;
