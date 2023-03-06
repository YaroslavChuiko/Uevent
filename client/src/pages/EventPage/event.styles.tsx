import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  info: SystemStyleObject;
  mainInfo: SystemStyleObject;
  price: SystemStyleObject;
  dateNLocation: SystemStyleObject;
  location: SystemStyleObject;
  poster: SystemStyleObject;
  blurBg: (src: string) => SystemStyleObject;
  image: SystemStyleObject;
};

const mainInfoMaxW = {
  maxW: {
    base: '100%',
    lg: '40rem',
    xl: '60rem',
  },
};

const styles: TStyle = {
  info: {
    flexDir: {
      base: 'column',
      lg: 'row',
    },
  },
  mainInfo: mainInfoMaxW,
  price: {
    w: { base: '100%', lg: '30rem' },
    ml: { lg: '8' },
    mt: { base: '8', lg: '0' },
  },
  dateNLocation: {
    flexDir: { base: 'column', sm: 'row' },
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    w: '100%',
  },
  location: {
    p: {
      base: '4',
      sm: '6',
    },
    ml: { sm: '4' },
    mt: { base: '4', sm: '0' },
  },
  poster: {
    bgColor: 'gray.100',
    width: '100%',
    px: {
      base: '2rem',
      md: '5rem',
      lg: '6rem',
    },
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  blurBg: (src: string) => ({
    bgImage: src,
    bgRepeat: 'no-repeat',
    bgPosition: '50%',
    bgSize: 'cover',
    position: 'absolute',
    inset: 0,
    bgColor: 'gray.200',
    filter: 'blur(30px) brightness(.8)',
    zIndex: 0,
  }),
  image: {
    zIndex: 5,
    maxHeight: {
      base: '200px',
      sm: '300px',
      md: '400px',
      lg: '480px',
    },
  },
};

export default styles;
