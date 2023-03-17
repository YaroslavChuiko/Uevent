import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = { page: SystemStyleObject; shape: SystemStyleObject };

const styles: TStyle = {
  page: {
    width: '100%',
    minH: `100vh`,
    px: '15px',
    pb: '50px',
    pt: { base: '50px', md: '20px' },
    position: 'relative',
    overflow: 'hidden',
  },
  shape: {
    position: 'absolute',
    w: '100%',
    zIndex: '-1',
  },
};

export default styles;
