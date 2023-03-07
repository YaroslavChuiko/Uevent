import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  blurBg: (src: string) => SystemStyleObject;
  poster: SystemStyleObject;
  intro: SystemStyleObject;
  location: SystemStyleObject;
};

const styles: TStyle = {
  blurBg: (src: string) => ({
    bgImage: src,
    bgRepeat: 'no-repeat',
    bgPosition: '50%',
    bgSize: 'cover',
    position: 'absolute',
    bgColor: 'blue.200',
    filter: 'blur(30px) brightness(.8)',
    zIndex: 0,
  }),
  poster: {
    bgColor: 'blue.100',
    width: '100%',
    minHeight: {
      base: '270px',
      sm: '370px',
      md: '470px',
      lg: '550px',
    },
    px: {
      base: '2rem',
      md: '5rem',
      lg: '6rem',
    },
    py: {
      base: '20px',
      md: '30px',
      lg: '60px',
    },
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  intro: {
    zIndex: 5,
    minWidth: '60%',
    minHeight: {
      base: '200px',
      sm: '300px',
      md: '400px',
      lg: '480px',
    },
    padding: '30px',
    alignItems: 'center',
  },
  location: {
    variant: 'outline',
    p: {
      base: '4',
    },
    ml: { sm: '4' },
    mt: { base: '4', sm: '0' },
  },
};

export default styles;
