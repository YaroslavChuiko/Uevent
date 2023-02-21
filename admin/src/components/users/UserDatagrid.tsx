import { BooleanField, ChipField, Datagrid, NumberField, TextField } from 'react-admin';

const UserDatagrid = () => (
  <Datagrid rowClick="show">
    <NumberField source="id" />
    <TextField source="login" />
    <TextField source="email" />
    <TextField source="fullName" />
    <BooleanField label="Is confirmed" source="isConfirmed" />
    <ChipField source="role" />
  </Datagrid>
);

export default UserDatagrid;
