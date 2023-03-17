import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactComponent as Waves } from '~/assets/waves.svg';
import kute from 'kute.js';
import { useEffect } from 'react';

const wavesId = [
  ['#wave1_1', '#wave2_1'],
  ['#wave1_2', '#wave2_2'],
  ['#wave1_3', '#wave2_3'],
  ['#wave1_4', '#wave2_4'],
];

const Footer = () => {
  useEffect(() => {
    const animationOption = { repeat: 999, duration: 3000, yoyo: true };

    const animations = wavesId.map((item) => {
      return kute.fromTo(item[0], { path: item[0] }, { path: item[1] }, animationOption);
    });

    animations.forEach((tween) => tween.start());
  }, []);

  return (
    <Box position="absolute" width="100%" bottom="0">
      <Box position="relative" left="-10px">
        <Waves width="102%" />
      </Box>
      <Flex align="center" justify="center" bgColor="secondary" h="50px">
        <Text fontSize="12px" color="white">
          &copy; 2023 UEVENT. All Rights Reserved.{' '}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
