import { useRecordContext } from 'react-admin';

const UserTitle = () => {
  const record = useRecordContext();
  return <span>User {record ? `: ${record.login}` : ''}</span>;
};

export default UserTitle;
