import { useRecordContext } from 'react-admin';

const PromocodeTitle = () => {
  const record = useRecordContext();
  return <span>Promo Code {record ? `: ${record.promoCode}` : ''}</span>;
};

export default PromocodeTitle;
