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
    width: '100%',
    p: { base: '10px 10px', md: '20px 30px' },
    maxW: '500px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px;',
  },
  heading: {
    textAlign: 'center',
    color: 'hover',
    fontSize: { base: '25px', sm: '30px' },
  },
  button: {
    w: '250px',
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
