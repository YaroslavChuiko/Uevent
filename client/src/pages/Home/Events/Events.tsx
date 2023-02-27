import { useState } from 'react';
import Container from '~/components/Container/Container';
import EventList from './EventList';
import EventFilters from './EventFilters';
import { formatOption } from '~/components/Select/AsyncSelectFormat/format-option.type';

const Events = () => {
  const [format, setFormat] = useState<formatOption | null>(null);

  return (
    <Container>
      <EventFilters format={format} setFormat={setFormat} />
      <EventList formatId={format?.id} />
    </Container>
  );
};

export default Events;
