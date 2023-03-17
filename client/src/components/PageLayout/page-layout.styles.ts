import { SystemStyleObject } from '@chakra-ui/react';
import { NAVBAR_HEIGHT } from '~/consts/components';

type StyleType = { [key: string]: SystemStyleObject };
const styles: StyleType = {
  main: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '100px',
    overflow: 'hidden',
  },
  router: {
    pt: `${NAVBAR_HEIGHT}rem`,
  },
};

export default styles;
