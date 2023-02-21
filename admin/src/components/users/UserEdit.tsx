import { Edit, ImageField, ImageInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { ROLE_OPTIONS } from '../../consts/validation';
import { updateSchema } from '../../validation/users';
import { AvatarField } from '../customFields/AvatarField';
import UserTitle from './UserTitle';

const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm resolver={updateSchema}>
      <TextInput source="login" />
      <TextInput source="email" />
      <TextInput source="fullName" />
      <SelectInput source="role" choices={ROLE_OPTIONS} />
      <AvatarField source="picturePath" />
      <ImageInput source="avatar" label="Avatar">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
