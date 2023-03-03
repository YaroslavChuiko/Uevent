import { SystemStyleObject } from '@chakra-ui/react';
import { NAVBAR_COLOR, NAVBAR_HEIGHT } from '~/consts/components';
import layout from '../Layout/layout.styles';

type StylesType = { navbar: SystemStyleObject };

const styles: StylesType = {
  navbar: {
    position: 'absolute',
    minH: `${NAVBAR_HEIGHT - 1.5}rem`,
    top: 0,
    right: 0,
    left: 0,
    bgColor: NAVBAR_COLOR,
    zIndex: 100,
    px: layout.page.p,
    py: '10px',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  },
};

export default styles;
