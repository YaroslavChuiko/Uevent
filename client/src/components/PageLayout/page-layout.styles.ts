import { SystemStyleObject } from '@chakra-ui/react';

type StyleType = { [key: string]: SystemStyleObject };
const styles: StyleType = {
  main: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '100px',
    overflow: 'hidden',
    pt: '110px',
  },
};

export default styles;
