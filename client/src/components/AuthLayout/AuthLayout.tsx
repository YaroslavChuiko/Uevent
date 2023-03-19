import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import LeftWaveAnim from '../SvgAnim/LeftWaveAnim';
import RightWaveAnim from '../SvgAnim/RightWaveAnim';
import styles from './auth-layout.styles';

const AuthLayout = () => {
  return (
    <Flex justify="center" align="center" flexDirection="column" sx={styles.page}>
      <Box sx={styles.shape} top="0" left="0">
        <RightWaveAnim width="100%" />
      </Box>
      <Box sx={styles.shape} bottom="0" left="0">
        <LeftWaveAnim width="100%" />
      </Box>

      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
