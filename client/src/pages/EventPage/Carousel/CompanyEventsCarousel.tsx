import { Box, Heading } from '@chakra-ui/react';
import { useGetEventsQuery } from '~/store/api/event-slice';
import { Event, EventsParam } from '~/types/event';
import styles from '../event.styles';
import Carousel from './Carousel';
import CarouselNothingFound from './CarouselNothingFound';

type Props = {
  heading: string;
  eventId: number | null;
  companyId: number;
};

const CompanyEventsCarousel = ({ heading, eventId, companyId }: Props) => {
  const params: EventsParam = {
    _sort: 'date',
    _order: 'ASC' as const,
    _start: 0,
    _end: 20,
    upcoming: true,
    companyId: companyId,
  };

  const { data, isFetching, isSuccess } = useGetEventsQuery(params);

  let events: Event[] | null = null;

  if (isSuccess) {
    events = eventId ? data.events.filter((e) => e.id !== eventId) : data.events;
  }

  return (
    <Box py="40px" sx={{ ...styles.mainInfo, mx: !eventId ? 'auto' : 0 }}>
      <Heading as="h3" fontSize="24px">
        {heading}
      </Heading>
      {!events?.length && !isFetching ? <CarouselNothingFound /> : <Carousel isFetching={isFetching} events={events} />}
    </Box>
  );
};

export default CompanyEventsCarousel;
