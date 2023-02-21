import { BooleanField, ChipField, Datagrid, NumberField, TextField } from 'react-admin';
import { AvatarField } from '../customFields/AvatarField';

const UserDatagrid = () => (
  <Datagrid rowClick="show">
    <NumberField source="id" />
    <TextField source="login" />
    <AvatarField source="picturePath" label="Avatar" />
    <TextField source="email" />
    <TextField source="fullName" />
    <ChipField source="role" />
    <BooleanField label="Is confirmed" source="isConfirmed" />
  </Datagrid>
);

export default UserDatagrid;
