import { Flex } from '@chakra-ui/react';
import styles from './page-base.styles';
import { Outlet } from 'react-router-dom';

const PageBase = () => {
  return (
    <Flex sx={styles.page}>
      <Outlet />
    </Flex>
  );
};

export default PageBase;
