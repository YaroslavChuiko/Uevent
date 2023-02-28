import { Box } from '@chakra-ui/react';
import AsyncSelectFormat from '~/components/Select/AsyncSelectFormat';
import { SelectOptionData } from '~/types/select-option-data';

type Props = {
  format: SelectOptionData | null;
  setFormat: (format: SelectOptionData) => void;
};

const EventFilters = ({ format, setFormat }: Props) => {
  return (
    <Box>
      <AsyncSelectFormat format={format} setFormat={setFormat} />
    </Box>
  );
};

export default EventFilters;
