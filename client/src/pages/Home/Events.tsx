import Container from '~/components/Container/Container';
import EventList from './EventList';
import EventsFilter from './EventsFilter';

const Events = () => {
  return (
    <Container>
      <EventsFilter />
      <EventList />
    </Container>
  );
};

export default Events;
