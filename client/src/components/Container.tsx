import { Box, BoxProps } from '@chakra-ui/layout';

const Container = ({ children, ...restProps }: BoxProps) => {
  return (
    <Box maxW={{ base: '24px', md: '40px', lg: '1360px' }} h="100%" m="0 auto" p="0 15px" {...restProps}>
      {children}
    </Box>
  );
};

export default Container;
