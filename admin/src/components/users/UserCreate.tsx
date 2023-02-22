import { Create, PasswordInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { ROLE_OPTIONS } from '../../consts/validation';
import { createSchema } from '../../validation/users';

const UserCreate = () => (
  <Create redirect="show">
    <SimpleForm resolver={createSchema}>
      <TextInput source="login" />
      <TextInput source="email" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
      <SelectInput source="role" choices={ROLE_OPTIONS} />
    </SimpleForm>
  </Create>
);

export default UserCreate;
