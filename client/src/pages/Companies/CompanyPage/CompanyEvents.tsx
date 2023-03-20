import { useParams } from 'react-router-dom';
import EventList from '~/pages/Home/Events/EventList';

const CompanyEvents = () => {
  const { id: companyId } = useParams();

  return <EventList dateRange={null} companyId={Number(companyId)} itemsPerPage={3} />;
};

export default CompanyEvents;
