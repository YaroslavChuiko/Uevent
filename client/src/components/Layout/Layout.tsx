import { Flex } from '@chakra-ui/react';
import styles from './Layout.styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Flex sx={styles.page}>
      <Outlet />
    </Flex>
  );
};

export default Layout;
