import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import EventInfo from './Info/EventInfo';
import { useGetEventQuery } from '~/store/api/event-slice';
import Loader from '~/components/Loader/Loader';
import PageAlert from '~/components/PageAlert/PageAlert';
import IError from '~/types/error';
import { useEffect } from 'react';
import { useLazyGetCompanyQuery } from '~/store/api/company-slice';
import { Company } from '~/types/company';
import CompanyInfo from './Info/CompanyInfo';

const EventPage = () => {
  const { id } = useParams();
  const { data: event, isLoading: isLoadingEvent, error } = useGetEventQuery(Number(id));
  const [getCompany, { data: company, isLoading: isLoadingCompany }] = useLazyGetCompanyQuery();

  useEffect(() => {
    if (event && event.id) {
      getCompany(event.companyId);
    }
  }, [event]);

  if (isLoadingEvent || isLoadingCompany || ((!event || !company) && !error)) {
    return <Loader />;
  }

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  return (
    <Container pb="16">
      <EventInfo event={event} companyName={(company as Company).name}></EventInfo>
      <CompanyInfo company={company as Company}></CompanyInfo>
    </Container>
  );
};

export default EventPage;
