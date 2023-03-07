import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCompanyQuery } from '~/store/api/company-slice';
import CompanyInfo from './CompanyInfo';
import CompanyUpdateForm from '../CompanyUpdate/CompanyUpdateForm';
import PageAlert from '~/components/PageAlert/PageAlert';
import Loader from '~/components/Loader/Loader';
import IError from '~/types/error';
import type { Company } from '~/types/company';

const CompanyPage = () => {
  const { id: companyId } = useParams();
  const { data: company, isLoading: comIsLoading, error: comError } = useGetCompanyQuery(Number(companyId));
  const [isEdit, setIsEdit] = useState(false);

  if (comError) {
    return <PageAlert status="error" message={(comError as IError).data.message} />;
  }

  if (comIsLoading) {
    return <Loader />;
  }

  return (
    <>
      {isEdit ? (
        <CompanyUpdateForm company={company as Company} setEdit={setIsEdit} />
      ) : (
        <CompanyInfo company={company as Company} setEdit={setIsEdit} />
      )}
    </>
  );
};

export default CompanyPage;
