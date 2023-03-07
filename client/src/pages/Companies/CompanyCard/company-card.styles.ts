import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
  cardBody: SystemStyleObject;
  stack: SystemStyleObject;
  heading: SystemStyleObject;
  text: SystemStyleObject;
  founder: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    maxWidth: 'sm',
    flexDirection: 'row',
    overflow: 'hidden',
    variant: 'outline',
    padding: '10px',
    boxShadow: 'lg',
    transition: 'box-shadow 0.2s ease-out',
    _hover: {
      boxShadow: '2xl',
    },
  },
  cardBody: {
    overflow: 'hidden',
  },
  stack: {
    boxSizing: 'border-box',
    w: 'auto',
    maxW: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    mt: '1',
    spacing: '2',
  },
  heading: {
    as: 'h3',
    noOfLines: '1',
    fontSize: '18px',
  },
  text: {
    noOfLines: '1',
  },
  founder: {
    noOfLines: '1',
    fontSize: '14px',
  },
};

export default styles;
