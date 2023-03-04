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
    md: '30rem',
    lg: '50rem',
  },
};

const styles: TStyle = {
  info: {
    flexDir: {
      base: 'column',
      md: 'row',
    },
  },
  mainInfo: mainInfoMaxW,
  price: {
    w: { base: '100%', md: '30rem' },
    ml: { md: '8' },
    mt: { base: '8', md: '0' },
    p: '',
  },
  dateNLocation: {
    flexDir: { base: 'column', sm: 'row' },
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    w: '100%',
    ...mainInfoMaxW,
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
    height: {
      base: '200px',
      sm: '300px',
      md: '500px',
      lg: '480px',
    },
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
  image: { zIndex: 5 },
};

export default styles;
