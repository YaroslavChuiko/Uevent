import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailConfirmation from './pages/Auth/EmailConfirmation';
import SendPasswordConfirmation from './pages/Auth/SendPasswordConfirmation';
import PasswordReset from './pages/Auth/PasswordReset';
import ProfileRoutes from './routes/Profile';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />
        <Route path="/confirm-password-reset" element={<SendPasswordConfirmation />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="profile/*" element={<ProfileRoutes />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
