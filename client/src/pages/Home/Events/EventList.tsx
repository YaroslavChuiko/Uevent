import { SimpleGrid, SlideFade } from '@chakra-ui/react';
import { DateRange } from 'react-day-picker';
import { useGetEventsQuery } from '~/store/api/event-slice';
import { EventsParam } from '~/types/event';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';
import NothingFound from './NothingFound';

type Props = {
  formatId: number | undefined;
  themeId: number | undefined;
  dateRange: DateRange | null;
};

const EventList = ({ formatId, themeId, dateRange }: Props) => {
  const params: EventsParam = {
    _sort: 'date',
    _order: 'ASC' as const,
    _start: 0,
    _end: 10,
    upcoming: true,
  };
  formatId ? (params.formatId = formatId) : null;
  themeId ? (params.themeId = themeId) : null;
  if (dateRange?.from && dateRange?.to) {
    params.dateFrom = dateRange.from.toISOString();
    params.dateTo = dateRange.to.toISOString();
  }

  const { data, isFetching } = useGetEventsQuery(params);

  return (
    <SimpleGrid minChildWidth="300px" spacing="30px" p="40px 0">
      {isFetching ? (
        <>
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </>
      ) : data?.events.length ? (
        data?.events.map((event) => (
          <SlideFade key={event.id} offsetY="30px" in={true}>
            <EventCard event={event} h="100%" />
          </SlideFade>
        ))
      ) : (
        <SlideFade offsetY="30px" in={true}>
          <NothingFound />
        </SlideFade>
      )}
    </SimpleGrid>
  );
};

export default EventList;
