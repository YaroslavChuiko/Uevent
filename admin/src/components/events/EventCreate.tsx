import {
  AutocompleteInput,
  BooleanInput,
  Create,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { createSchema } from '../../validation/events';

const EventCreate = () => (
  <Create redirect="show">
    <SimpleForm resolver={createSchema}>
      <TextInput source="name" fullWidth />
      <ReferenceInput label="Company" source="companyId" reference="companies">
        <AutocompleteInput optionText="name" fullWidth />
      </ReferenceInput>
      <NumberInput source="price" />
      <NumberInput source="ticketsAvailable" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
      <BooleanInput label="Public" source="isPublic" />
      <BooleanInput label="Notifications" source="isNotificationsOn" />
      <ReferenceInput label="Format" source="formatId" reference="formats">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Theme" source="themeId" reference="themes">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <DateTimeInput label="Publication date" source="publishDate" />
      <DateTimeInput source="date" />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  </Create>
);

export default EventCreate;
