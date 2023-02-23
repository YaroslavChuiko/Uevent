import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';

function App(props: any) {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={curUser.id ? <Navigate to="/" /> : <Register />} />
        <Route path="/email-confirmation/:token" element={<EmailConfirmation />} />
        <Route path="/password-reset" element={<SendPasswordConfirmation />} />
        <Route path="/password-reset/:token" element={<PasswordConfirmation />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
