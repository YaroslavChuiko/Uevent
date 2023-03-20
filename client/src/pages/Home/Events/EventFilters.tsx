import { InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import AsyncSelectFormat from '~/components/Select/AsyncSelectFormat';
import AsyncSelectTheme from '~/components/Select/AsyncSelectTheme';
import { SelectOptionData } from '~/types/select-option-data';
import EventDatesMenu from './EventDatesMenu';

type Props = {
  format: SelectOptionData | null;
  theme: SelectOptionData | null;
  setFormat: (format: SelectOptionData) => void;
  setTheme: (format: SelectOptionData) => void;
  dateRange: DateRange | null;
  setDateRange: (val: DateRange | null) => void;
};

const EventFilters = ({ format, theme, setFormat, setTheme, dateRange, setDateRange }: Props) => {
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing="20px">
      <InputGroup>
        <InputLeftAddon>Format</InputLeftAddon>
        <AsyncSelectFormat format={format} setFormat={setFormat} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Theme</InputLeftAddon>
        <AsyncSelectTheme theme={theme} setTheme={setTheme} />
      </InputGroup>
      <EventDatesMenu dateRange={dateRange} setDateRange={setDateRange} />
    </Stack>
  );
};

export default EventFilters;
