import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
  date: SystemStyleObject;
  price: SystemStyleObject;
  address: SystemStyleObject;
  company: SystemStyleObject;
  img: SystemStyleObject;
  tag: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    maxWidth: { base: 'none', md: 'sm' },
    minWidth: '300px',
    overflow: 'hidden',
    boxShadow: 'md',
    transition: 'box-shadow 0.2s ease-out',
    _hover: {
      boxShadow: 'xl',
    },
  },
  date: {
    color: 'secondary',
    fontWeight: 'semibold',
  },
  price: {
    color: 'gray.600',
    fontSize: '14px',
  },
  address: {
    color: 'gray.600',
    fontSize: '14px',
  },
  company: {
    fontSize: '14px',
    color: 'gray.700',
  },
  img: {
    objectFit: 'cover',
  },
  tag: {
    fontSize: '12px',
  },
};

export default styles;
