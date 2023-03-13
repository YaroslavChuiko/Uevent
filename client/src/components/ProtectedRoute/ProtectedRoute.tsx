import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.profile);

  if (user.id) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
