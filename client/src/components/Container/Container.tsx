import { Box, BoxProps } from '@chakra-ui/layout';
import styles from '../Layout/layout.styles';

const Container = ({ children, ...restProps }: BoxProps) => {
  return (
    //TODO: update media query
    <Box
      maxW={{ base: '24px', md: '40px', lg: '1360px' }}
      h="100%"
      m="0 auto"
      sx={{ px: styles.page.p }}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Container;
