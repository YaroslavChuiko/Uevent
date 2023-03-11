import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = { card: SystemStyleObject; heading: SystemStyleObject };

const styles: TStyle = {
  card: {
    width: { base: '90%', md: '80%', xl: '50%' },
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: 'hover',
  },
};

export default styles;
