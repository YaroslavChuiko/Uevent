import { Route, Routes } from 'react-router-dom';
import ProfilePage from '~/pages/Profile/Profile';

const ProfileRoutes = () => (
  <Routes>
    <Route index element={<ProfilePage />}></Route>;
  </Routes>
);

export default ProfileRoutes;
