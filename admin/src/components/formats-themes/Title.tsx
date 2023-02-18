import { useRecordContext } from "react-admin";

const Title = ({ modelName }: { modelName: string }) => {
	const record = useRecordContext();
	return <span>{modelName[0].toUpperCase() + modelName.slice(1)} {record ? `: ${record.name}` : ''}</span>;
};

export default Title;

