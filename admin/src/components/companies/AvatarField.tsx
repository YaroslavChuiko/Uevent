import { useRecordContext } from 'react-admin';
import { Avatar } from '@mui/material';

const AvatarField = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;
	return (
		<Avatar
			src={`${import.meta.env.VITE_SERVER_URL}/${record.picturePath}`}
			alt={record.name}
		/>
	);
};

export { AvatarField };

