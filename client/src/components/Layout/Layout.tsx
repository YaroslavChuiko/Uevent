import React from 'react';
import { Center } from '@chakra-ui/react';
import styles from './layout.styles';

const Layout = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  return <Center sx={styles.page}>{children}</Center>;
};

export default Layout;
