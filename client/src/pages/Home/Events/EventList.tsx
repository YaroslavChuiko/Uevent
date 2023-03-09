import { Flex, SimpleGrid, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import EventCard from '~/components/EventCard/EventCard';
import EventCardSkeleton from '~/components/EventCard/EventCardSkeleton';
import Pagination from '~/components/Pagination/Pagination';
import { useGetEventsQuery } from '~/store/api/event-slice';
import { EventsParam } from '~/types/event';
import NothingFound from './NothingFound';

type Props = {
  formatId: number | undefined;
  themeId: number | undefined;
  dateRange: DateRange | null;
};

const EventList = ({ formatId, themeId, dateRange }: Props) => {
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 8;

  const params: EventsParam = {
    _sort: 'date',
    _order: 'ASC' as const,
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
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
    <>
      <SimpleGrid minChildWidth="300px" spacing={{ base: '20px', md: '30px' }} py="40px">
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
      <Flex w="100%" alignItems="center" justifyContent="center" pb="40px">
        {data?.events.length ? (
          <Pagination
            numberOfPages={Math.ceil((data?.totalCount as number) / itemsPerPage)}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        ) : null}
      </Flex>
    </>
  );
};

export default EventList;
