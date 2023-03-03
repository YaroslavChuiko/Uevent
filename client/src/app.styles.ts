import { SystemStyleObject } from '@chakra-ui/react';
import { NAVBAR_HEIGHT } from './consts/components';

type StyleType = { [key: string]: SystemStyleObject };
const styles: StyleType = {
  main: {
    position: 'relative',
    height: '100vh',
  },
  router: {
    pt: `${NAVBAR_HEIGHT}rem`,
  },
};

export default styles;
