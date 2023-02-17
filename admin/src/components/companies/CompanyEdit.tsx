import { NumberInput, Edit, SimpleForm, TextInput, ImageInput, ImageField } from 'react-admin';
import { AvatarField } from '../customFields/AvatarField';
import { updateSchema } from '../../validation/companies';
import CompanyTitle from './CompanyTitle';

export const CompanyEdit = () => (
  <Edit title={<CompanyTitle />}>
    <SimpleForm resolver={updateSchema}>
      <TextInput source="name" />
      <TextInput source="email" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
      <AvatarField source="picturePath" />
      <ImageInput source="avatar" label="Avatar">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export default CompanyEdit;
