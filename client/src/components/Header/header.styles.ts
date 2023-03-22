import { SystemStyleObject } from '@chakra-ui/react';
import { NAVBAR_COLOR } from '~/consts/components';
import container from '../Container/container.styles';

type StylesType = {
  [key: string]: SystemStyleObject;
};

const styles: StylesType = {
  navbar: {
    position: 'fixed',
    h: '70px',
    top: 0,
    right: 0,
    left: 0,
    bgColor: NAVBAR_COLOR,
    zIndex: 100,
    py: '10px',
    transition: 'box-shadow 0.3s linear',
  },
  container: container.container,
};

export default styles;
