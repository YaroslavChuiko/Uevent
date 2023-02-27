import { Route, Routes } from 'react-router-dom';
import AllCompaniesPage from '~/pages/Companies/AllCompaniesPage';

const CompaniesRoutes = () => (
  <Routes>
    <Route index element={<AllCompaniesPage />}></Route>;
  </Routes>
);

export default CompaniesRoutes;
