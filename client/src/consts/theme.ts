import { ChakraProps, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  semanticTokens: {
    colors: {
      secondary: {
        default: 'blue.500',
      },
      hover: {
        default: 'blue.800',
      },
      text: {
        default: 'white',
      },
    },
  },
});

export default theme;
