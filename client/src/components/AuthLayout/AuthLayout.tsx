import { Box, Flex } from '@chakra-ui/react';
import { ReactComponent as WaveRight } from '~/assets/wave-right.svg';
import { ReactComponent as WaveLeft } from '~/assets/wave-left.svg';
import kute from 'kute.js';
import { useEffect } from 'react';
import styles from './auth-layout.styles';
import { Outlet } from 'react-router-dom';

const wavesId = [
  ['#wr1_1', '#wr2_1'],
  ['#wr1_2', '#wr2_2'],
  ['#wr1_3', '#wr2_3'],
  ['#wr1_4', '#wr2_4'],
  ['#wr1_5', '#wr2_5'],
  ['#wl1_1', '#wl2_1'],
  ['#wl1_2', '#wl2_2'],
  ['#wl1_3', '#wl2_3'],
  ['#wl1_4', '#wl2_4'],
  ['#wl1_5', '#wl2_5'],
];

const AuthLayout = () => {
  useEffect(() => {
    const animationOption = { repeat: 999, duration: 10000, yoyo: true };

    const animations = wavesId.map((item) => {
      return kute.fromTo(item[0], { path: item[0] }, { path: item[1] }, animationOption);
    });

    animations.forEach((tween) => tween.start());
  }, []);

  return (
    <Flex justify="center" align="center" flexDirection="column" sx={styles.page}>
      <Box sx={styles.shape} top="-10px" left="0">
        <WaveRight width="100%" />
      </Box>
      <Box sx={styles.shape} bottom="-10px" left="0">
        <WaveLeft width="100%" />
      </Box>

      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
