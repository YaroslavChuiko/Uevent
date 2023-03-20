import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './page-layout.styles';

const PageLayout = () => {
  return (
    <Box sx={styles.main}>
      <Header />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default PageLayout;
