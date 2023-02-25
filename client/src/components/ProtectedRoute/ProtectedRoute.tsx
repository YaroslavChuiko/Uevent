import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import useCustomToast from '~/hooks/use-custom-toast';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.profile);
  const { toast } = useCustomToast();

  useEffect(() => {
    if (!user.id) {
      toast('You do not have access to this page.', 'error');
    }
  }, [user.id, toast]);

  if (user.id) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
