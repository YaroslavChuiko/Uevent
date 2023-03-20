import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"Poppins", sans-serif`,
    body: `"Poppins", sans-serif`,
  },
  semanticTokens: {
    colors: {
      secondary: {
        default: 'blue.500',
      },
      hover: {
        default: 'blue.800',
      },
      tertiary: {
        default: 'purple.500',
      },
      text: {
        default: 'white',
      },
    },
  },
});

export default theme;
