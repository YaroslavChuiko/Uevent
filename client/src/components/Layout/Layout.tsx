import React from 'react';
import { Flex } from '@chakra-ui/react';
import styles from './Layout.styles';

const Layout = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  return <Flex sx={styles.page}>{children}</Flex>;
};

export default Layout;
