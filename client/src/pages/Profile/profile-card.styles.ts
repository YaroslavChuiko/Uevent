import { SystemStyleObject } from '@chakra-ui/react';

type StylesType = { card: SystemStyleObject };

const styles: StylesType = {
  card: {
    width: { base: '90%', md: '80%', xl: '50%' },
    margin: '0 auto',
  },
};

export default styles;
