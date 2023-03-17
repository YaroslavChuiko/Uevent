import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import PageLayout from './components/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import EmailConfirmation from './pages/Auth/EmailConfirmation';
import Login from './pages/Auth/Login';
import PasswordReset from './pages/Auth/PasswordReset';
import Register from './pages/Auth/Register';
import SendPasswordConfirmation from './pages/Auth/SendPasswordConfirmation';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import CancelledPayment from './pages/Payment/Cancel';
import SuccessfulPayment from './pages/Payment/Success';
import CompaniesRoutes from './routes/Companies';
import EventRoutes from './routes/Events';
import ProfileRoutes from './routes/Profile';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
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
        <Route path="/payment/success" element={<SuccessfulPayment />}></Route>
        <Route path="/payment/cancel" element={<CancelledPayment />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
