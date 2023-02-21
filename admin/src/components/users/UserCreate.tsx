import { Create, PasswordInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { ROLE_ENUM } from '../../consts/validation';
import { createSchema } from '../../validation/users';

const roles = ROLE_ENUM.map((r) => ({ id: r, name: r }));

const UserCreate = () => (
  <Create redirect="show">
    <SimpleForm resolver={createSchema}>
      <TextInput source="login" />
      <TextInput source="email" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
      <SelectInput source="role" choices={roles} />
    </SimpleForm>
  </Create>
);

export default UserCreate;
