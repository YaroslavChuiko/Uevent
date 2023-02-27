import { SimpleGrid } from '@chakra-ui/react';
import { useGetEventsQuery } from '~/store/api/event-slice';
import { EventsParam } from '~/types/event';
import EventCard from './EventCard';

type Props = {
  formatId: number | undefined;
};

const EventList = ({ formatId }: Props) => {
  const params: EventsParam = {
    _sort: 'format',
    _order: 'DESC' as const,
    _start: 0,
    _end: 10,
  };
  formatId ? (params.formatId = formatId) : null;

  const { data, error, isError, isLoading } = useGetEventsQuery(params);

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }

  console.log('🚀 ~ file: EventList.tsx:12 ~ EventList ~ data:', data);

  return (
    <SimpleGrid minChildWidth="300px" spacing="30px" p="40px 0">
      {data?.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </SimpleGrid>
  );
};

export default EventList;
