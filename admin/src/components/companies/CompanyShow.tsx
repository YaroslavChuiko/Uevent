import {
  ReferenceManyField,
  Pagination,
  NumberField,
  EmailField,
  ReferenceField,
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
} from 'react-admin';
import CompanyTitle from './CompanyTitle';
import { AvatarField } from '../customFields/AvatarField';
import { EventListDatagrid } from '../events/EventList';

const CompanyShow = () => (
  <Show title={<CompanyTitle />}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <AvatarField source="picturePath" label="Avatar" />
        <NumberField source="latitude" />
        <NumberField source="longitude" />
        <ReferenceField source="userId" reference="users">
          <TextField source="login" />
        </ReferenceField>
      </Tab>
      <Tab label="Events">
        <ReferenceManyField reference="events" target="companyId" pagination={<Pagination />} label={false}>
          <EventListDatagrid />
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default CompanyShow;
