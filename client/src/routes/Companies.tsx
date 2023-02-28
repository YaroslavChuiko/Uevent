import { Route, Routes } from 'react-router-dom';
import AllCompaniesPage from '~/pages/Companies/AllCompaniesPage';
import CompanyPage from '~/pages/Companies/CompanyPage';

const CompaniesRoutes = () => (
  <Routes>
    <Route index element={<AllCompaniesPage />} />;
    <Route path="/:id" element={<CompanyPage />} />;
  </Routes>
);

export default CompaniesRoutes;
