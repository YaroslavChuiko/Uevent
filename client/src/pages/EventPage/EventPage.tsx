import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import Loader from '~/components/Loader/Loader';
import PageAlert from '~/components/PageAlert/PageAlert';
import { useLazyGetCompanyQuery } from '~/store/api/company-slice';
import { useGetEventQuery } from '~/store/api/event-slice';
import { Company } from '~/types/company';
import IError from '~/types/error';
import CompanyEventsCarousel from './Carousel/CompanyEventsCarousel';
import SimilarEventsCarousel from './Carousel/SimilarEventsCarousel';
import Comments from './Comments/Comments';
import CompanyInfo from './Info/CompanyInfo';
import EventInfo from './Info/EventInfo';

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
      <Comments eventId={event.id} />
      <SimilarEventsCarousel eventId={event.id} eventFormatId={event.formatId} eventThemeId={event.themeId} />
      <CompanyEventsCarousel eventId={event.id} companyId={event.companyId} />
    </Container>
  );
};

export default EventPage;
