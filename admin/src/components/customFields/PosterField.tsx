import { useRecordContext } from 'react-admin';

const PosterField = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <img width={700} src={`${import.meta.env.VITE_SERVER_URL}/${record.picturePath}`} alt={record.name || 'poster'} />
  );
};

export { PosterField };
