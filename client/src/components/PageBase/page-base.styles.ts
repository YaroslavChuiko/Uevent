import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = { page: SystemStyleObject };

const styles: TStyle = {
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: { base: '20px', md: '40px', xl: '80px 100px' },
  },
};

export default styles;
