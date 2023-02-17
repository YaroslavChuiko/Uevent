import { useRecordContext } from "react-admin";

const CompanyTitle = () => {
	const record = useRecordContext();
	return <span>Company {record ? `: ${record.name}` : ''}</span>;
};

export default CompanyTitle;

