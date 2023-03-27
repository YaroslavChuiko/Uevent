import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthLayout = lazy(() => import('./components/AuthLayout'));
const PageLayout = lazy(() => import('./components/PageLayout'));

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Home = lazy(() => import('./pages/Home/Home'));
const EmailConfirmation = lazy(() => import('./pages/Auth/EmailConfirmation'));
const SendPasswordConfirmation = lazy(() => import('./pages/Auth/SendPasswordConfirmation'));
const PasswordReset = lazy(() => import('./pages/Auth/PasswordReset'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute/ProtectedRoute'));
const ProfileRoutes = lazy(() => import('./routes/Profile'));
const EventRoutes = lazy(() => import('./routes/Events'));
const CompaniesRoutes = lazy(() => import('./routes/Companies'));
const CancelledPayment = lazy(() => import('./pages/Payment/Cancel'));
const SuccessfulPayment = lazy(() => import('./pages/Payment/Success'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <Suspense>
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
    </Suspense>
  );
}

export default App;
