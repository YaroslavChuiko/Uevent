import { useState } from 'react';
import EventList from './EventList';
import EventFilters from './EventFilters';
import { SelectOptionData } from '~/types/select-option-data';
import Container from '~/components/Container';
import { DateRange } from 'react-day-picker';

const Events = () => {
  const [format, setFormat] = useState<SelectOptionData | null>(null);
  const [theme, setTheme] = useState<SelectOptionData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  return (
    <Container>
      <EventFilters
        format={format}
        setFormat={setFormat}
        theme={theme}
        setTheme={setTheme}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <EventList formatId={format?.id} themeId={theme?.id} dateRange={dateRange} />
    </Container>
  );
};

export default Events;
