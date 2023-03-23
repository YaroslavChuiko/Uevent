import Container from '~/components/Container';
import { useAppSelector } from '~/hooks/use-app-selector';
import EventList from '../Home/Events/EventList';

const Tickets = () => {
  const { user } = useAppSelector((state) => state.profile);

  return (
    <Container>
      <EventList dateRange={null} userId={Number(user.id)} />
    </Container>
  );
};

export default Tickets;
