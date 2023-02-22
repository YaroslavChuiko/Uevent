import {
  BooleanField,
  ChipField,
  NumberField,
  Pagination,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';
import CommentsDatagrid from '../comments/CommentsDatagrid';
import CompaniesDatagrid from '../companies/CompaniesDatagrid';
import { AvatarField } from '../customFields/AvatarField';
import UserTitle from './UserTitle';

const UserShow = () => (
  <Show title={<UserTitle />}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <SimpleShowLayout>
          <NumberField source="id" />
          <TextField source="login" />
          <TextField source="email" />
          <TextField source="fullName" />
          <BooleanField label="Is confirmed" source="isConfirmed" />
          <ChipField source="role" />
          <AvatarField source="picturePath" label="Avatar" />
        </SimpleShowLayout>
      </Tab>
      <Tab label="Comments">
        <ReferenceManyField reference="comments" target="userId" pagination={<Pagination />} label={false}>
          <CommentsDatagrid />
        </ReferenceManyField>
      </Tab>
      <Tab label="Companies">
        <ReferenceManyField reference="companies" target="creatorId" pagination={<Pagination />} label={false}>
          <CompaniesDatagrid />
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default UserShow;
