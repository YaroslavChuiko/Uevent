import { List, TextInput } from 'react-admin';
import CompaniesDatagrid from './CompaniesDatagrid';

const filters = [<TextInput source="q" label="Search" alwaysOn />];

const CompaniesList = (props: any) => (
  <List {...props} filters={filters}>
    <CompaniesDatagrid />
  </List>
);

export default CompaniesList;
