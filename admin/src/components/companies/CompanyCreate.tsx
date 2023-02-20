import { NumberInput, Create, SimpleForm, TextInput } from 'react-admin';
import { createSchema } from '../../validation/companies';

const CompanyCreate = () => (
  <Create redirect="show">
    <SimpleForm resolver={createSchema}>
      <TextInput source="name" />
      <TextInput source="email" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
    </SimpleForm>
  </Create>
);

export default CompanyCreate;
