import {
  BooleanField,
  ChipField,
  DateField,
  NumberField,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  Show,
  SimpleShowLayout,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';
import { AvatarField } from '../customFields/AvatarField';
import { PosterField } from '../customFields/PosterField';
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
    </TabbedShowLayout>
  </Show>
);

export default UserShow;
