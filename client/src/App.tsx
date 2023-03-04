import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailConfirmation from './pages/Auth/EmailConfirmation';
import SendPasswordConfirmation from './pages/Auth/SendPasswordConfirmation';
import PasswordReset from './pages/Auth/PasswordReset';
import ProfileRoutes from './routes/Profile';
import CompaniesRoutes from './routes/Companies';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Box } from '@chakra-ui/react';
import styles from './app.styles';
import EventRoutes from './routes/Events';

function App() {
  return (
    <Box sx={styles.main}>
      <Router>
        <Navbar />
        <Box sx={styles.router}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-email" element={<EmailConfirmation />} />
            <Route path="/confirm-password-reset" element={<SendPasswordConfirmation />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile/*" element={<ProfileRoutes />} />
            </Route>
            <Route path="events/*" element={<EventRoutes />} />
            <Route>
              <Route path="companies/*" element={<CompaniesRoutes />} />
            </Route>
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
