import { useParams } from 'react-router-dom';
import CompanyEventsCarousel from '~/pages/EventPage/Carousel/CompanyEventsCarousel';

const CompanyEvents = () => {
  const { id: companyId } = useParams();

  return <CompanyEventsCarousel heading="This company's events" eventId={null} companyId={Number(companyId)} />;
};

export default CompanyEvents;
