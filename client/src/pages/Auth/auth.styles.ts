import { SystemStyleObject } from '@chakra-ui/react';

type TStyle = {
  wrapper: SystemStyleObject;
  container: SystemStyleObject;
  heading: SystemStyleObject;
  button: SystemStyleObject;
  footer: SystemStyleObject;
  footerText: SystemStyleObject;
};

const styles: TStyle = {
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    minH: '100vh',
  },
  container: {
    minW: '400px',
  },
  heading: {
    fontSize: '35px',
    marginBottom: '30px',
    textAlign: 'center',
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
};

export default styles;
