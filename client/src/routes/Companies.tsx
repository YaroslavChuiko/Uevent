import { Route, Routes } from 'react-router-dom';
import CompaniesMainPage from '~/pages/Companies/CompaniesMainPage';
import CompanyPage from '~/pages/Companies/CompanyPage/CompanyPage';
import CompanyCreateForm from '~/pages/Companies/CompanyCreate/CompanyCreateForm';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

const CompaniesRoutes = () => (
  <Routes>
    <Route index element={<CompaniesMainPage />} />;
    <Route path="/:id" element={<CompanyPage />} />;
    <Route element={<ProtectedRoute />}>
      <Route path="/create" element={<CompanyCreateForm />} />;
    </Route>
  </Routes>
);

export default CompaniesRoutes;
