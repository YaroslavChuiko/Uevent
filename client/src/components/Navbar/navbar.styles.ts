import { SystemStyleObject } from '@chakra-ui/react';
import { NAVBAR_COLOR, NAVBAR_HEIGHT } from '~/consts/components';
import container from '../Container/container.styles';

type StylesType = {
  [key: string]: SystemStyleObject;
};

const styles: StylesType = {
  navbar: {
    position: 'absolute',
    minH: `${NAVBAR_HEIGHT - 1.5}rem`,
    top: 0,
    right: 0,
    left: 0,
    bgColor: NAVBAR_COLOR,
    zIndex: 100,
    py: '10px',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  },
  container: container.container,
};

export default styles;
