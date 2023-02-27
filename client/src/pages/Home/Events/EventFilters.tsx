import { Box } from '@chakra-ui/react';
import { formatOption } from '~/components/Select/AsyncSelectFormat/format-option.type';
import AsyncSelectFormat from '../../../components/Select/AsyncSelectFormat/AsyncSelectFormat';

type Props = {
  format: formatOption | null;
  setFormat: (format: formatOption) => void;
};

const EventFilters = ({ format, setFormat }: Props) => {
  return (
    <Box>
      <AsyncSelectFormat format={format} setFormat={setFormat} />
    </Box>
  );
};

export default EventFilters;
