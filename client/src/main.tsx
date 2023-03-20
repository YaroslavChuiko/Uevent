import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import Loader from './components/Loader/Loader';
import { persistor, store } from './store/store';
import './styles/index.css';
import theme from './styles/theme';
import '@fontsource/poppins';
import '@fontsource/pacifico';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  // </StrictMode>,
);
