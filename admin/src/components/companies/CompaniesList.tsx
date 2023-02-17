import { Datagrid, NumberField, EmailField, List, ReferenceField, TextField, TextInput, EditButton } from 'react-admin';
import { AvatarField } from '../customFields/AvatarField';

const filters = [<TextInput source="q" label="Search" alwaysOn />];

const CompaniesList = (props: any) => (
  <List {...props} filters={filters}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <AvatarField source="picturePath" label="Avatar" />
      <NumberField source="latitude" />
      <NumberField source="longitude" />
      <ReferenceField source="userId" reference="users">
        <TextField source="login" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export default CompaniesList;
