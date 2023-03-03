import { SystemStyleObject } from '@chakra-ui/react';
import layout from '../Layout/layout.styles';

type TStyle = { container: SystemStyleObject };

const styles: TStyle = {
  container: {
    maxW: {
      base: '100%',
      md: '800px',
      lg: '1360px',
    },
    px: layout.page.p,
    mx: 'auto',
  },
};

export default styles;
