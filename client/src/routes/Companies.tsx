import { Route, Routes } from 'react-router-dom';
import AllCompaniesPage from '~/pages/Companies/AllCompaniesPage/AllCompaniesPage';
import CompanyPage from '~/pages/Companies/CompanyPage';
import CompanyCreateForm from '~/pages/Companies/CompanyCreate/CompanyCreateForm';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

const CompaniesRoutes = () => (
  <Routes>
    <Route index element={<AllCompaniesPage />} />;
    <Route path="/:id" element={<CompanyPage />} />;
    <Route element={<ProtectedRoute />}>
      <Route path="/create" element={<CompanyCreateForm />} />;
    </Route>
  </Routes>
);

export default CompaniesRoutes;
