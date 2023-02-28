import { Box } from '@chakra-ui/react';
import AsyncSelectFormat from '~/components/Select/AsyncSelectFormat';
import AsyncSelectTheme from '~/components/Select/AsyncSelectTheme';
import { SelectOptionData } from '~/types/select-option-data';

type Props = {
  format: SelectOptionData | null;
  theme: SelectOptionData | null;
  setFormat: (format: SelectOptionData) => void;
  setTheme: (format: SelectOptionData) => void;
};

const EventFilters = ({ format, theme, setFormat, setTheme }: Props) => {
  return (
    <Box>
      <AsyncSelectFormat format={format} setFormat={setFormat} />
      <AsyncSelectTheme theme={theme} setTheme={setTheme} />
    </Box>
  );
};

export default EventFilters;
