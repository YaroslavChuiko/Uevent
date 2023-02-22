import { List, TextInput } from 'react-admin';
import PromocodeDatagrid from './PromocodeDatagrid';

const filters = [<TextInput source="q" label="Search" alwaysOn />];

const PromocodeList = () => (
  <List filters={filters}>
    <PromocodeDatagrid />
  </List>
);

export default PromocodeList;
