import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  card: SystemStyleObject;
  heading: SystemStyleObject;
  button: SystemStyleObject;
  footer: SystemStyleObject;
  footerText: SystemStyleObject;
  link: SystemStyleObject;
};

const styles: TStyle = {
  card: {
    width: { base: '90%', md: '80%', xl: '50%' },
    margin: '0 auto',
    variant: 'outline',
  },
  heading: {
    textAlign: 'center',
    color: 'hover',
  },
  button: {
    w: '200px',
    spinnerPlacement: 'end',
  },
  footer: {
    marginTop: '25px',
  },
  footerText: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'underline',
    color: 'secondary',
    _hover: {
      color: 'hover',
    },
  },
};

export default styles;
