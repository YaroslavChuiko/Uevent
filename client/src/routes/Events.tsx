import { Route, Routes } from 'react-router-dom';
import EventPage from '~/pages/EventPage/EventPage';

const EventRoutes = () => (
  <Routes>
    <Route path="/:id" element={<EventPage />}></Route>
  </Routes>
);

export default EventRoutes;
