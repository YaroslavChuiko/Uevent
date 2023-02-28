import { useState } from 'react';
import EventList from './EventList';
import EventFilters from './EventFilters';
import { SelectOptionData } from '~/types/select-option-data';
import Container from '~/components/Container';

const Events = () => {
  const [format, setFormat] = useState<SelectOptionData | null>(null);
  const [theme, setTheme] = useState<SelectOptionData | null>(null);

  return (
    <Container>
      <EventFilters format={format} setFormat={setFormat} theme={theme} setTheme={setTheme} />
      <EventList formatId={format?.id} themeId={theme?.id} />
    </Container>
  );
};

export default Events;
