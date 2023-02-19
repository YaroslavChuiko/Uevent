import {
  AutocompleteInput,
  BooleanInput,
  DateTimeInput,
  Edit,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { updateSchema } from '../../validation/events';
import { PosterField } from '../customFields/PosterField';
import EventTitle from './EventTitle';

const EventEdit = () => (
  <Edit title={<EventTitle />}>
    <SimpleForm resolver={updateSchema}>
      <TextInput source="name" />
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
      <PosterField source="picturePath" />
      <ImageInput source="poster" label="Poster">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export default EventEdit;
