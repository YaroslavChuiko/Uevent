import { useState } from 'react';
import EventList from './EventList';
import EventFilters from './EventFilters';
import { SelectOptionData } from '~/types/select-option-data';
import Container from '~/components/Container';

const Events = () => {
  const [format, setFormat] = useState<SelectOptionData | null>(null);

  return (
    <Container>
      <EventFilters format={format} setFormat={setFormat} />
      <EventList formatId={format?.id} />
    </Container>
  );
};

export default Events;
