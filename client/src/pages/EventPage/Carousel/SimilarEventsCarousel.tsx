import { Box, Heading } from '@chakra-ui/react';
import { useGetEventsQuery } from '~/store/api/event-slice';
import { Event, EventsParam } from '~/types/event';
import styles from '../event.styles';
import Carousel from './Carousel';
import CarouselNothingFound from './CarouselNothingFound';

type Props = {
  eventId: number;
  eventFormatId: number;
  eventThemeId: number;
};

const SimilarEventsCarousel = ({ eventId, eventFormatId, eventThemeId }: Props) => {
  const params: EventsParam = {
    _sort: 'date',
    _order: 'ASC' as const,
    _start: 0,
    _end: 20,
    upcoming: true,
    formatId: eventFormatId,
    themeId: eventThemeId,
  };

  const { data, isFetching, isSuccess } = useGetEventsQuery(params);

  let events: Event[] | null = null;

  if (isSuccess) {
    events = data.events.filter((e) => e.id !== eventId);
  }

  return (
    <Box py="40px" sx={styles.mainInfo}>
      <Heading as="h3" fontSize="24px">
        More similar events
      </Heading>
      {!events?.length && !isFetching ? <CarouselNothingFound /> : <Carousel isFetching={isFetching} events={events} />}
    </Box>
  );
};

export default SimilarEventsCarousel;
