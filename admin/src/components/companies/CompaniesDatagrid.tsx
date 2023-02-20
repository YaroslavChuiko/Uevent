import { Datagrid, NumberField, EmailField, ReferenceField, TextField, EditButton } from 'react-admin';
import { AvatarField } from '../customFields/AvatarField';

const CompaniesDatagrid = (props: any) => (
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
);

export default CompaniesDatagrid;
