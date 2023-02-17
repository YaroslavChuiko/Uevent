import { useRecordContext } from 'react-admin';

const EventTitle = () => {
  const record = useRecordContext();
  return <span>Event {record ? `: ${record.name}` : ''}</span>;
};

export default EventTitle;
