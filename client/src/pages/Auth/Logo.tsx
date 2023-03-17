import { Heading } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Logo = () => {
  return (
    <Heading fontSize="40px" color="secondary" mb="40px">
      <ReactRouterLink to="/">uevent</ReactRouterLink>
    </Heading>
  );
};

export default Logo;
