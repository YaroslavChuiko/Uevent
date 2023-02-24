import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailConfirmation from './pages/Auth/EmailConfirmation';
import SendPasswordConfirmation from './pages/Auth/SendPasswordConfirmation';
import PasswordReset from './pages/Auth/PasswordReset';

function App(props: any) {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />
        <Route path="/confirm-password-reset" element={<SendPasswordConfirmation />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
