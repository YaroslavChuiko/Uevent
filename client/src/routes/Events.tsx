import { Route, Routes, Navigate } from 'react-router-dom';
import EventPage from '~/pages/EventPage/EventPage';
import EventCreateForm from '~/pages/EventForms/EventCreate/EventCreateForm';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';
import NotFound from '~/pages/NotFound/NotFound';

const EventRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/" />} />
    <Route path="/:id" element={<EventPage />}></Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/create" element={<EventCreateForm />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default EventRoutes;
