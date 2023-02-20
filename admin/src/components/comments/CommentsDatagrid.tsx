import { Datagrid, DateField, ReferenceField, TextField, TextInput, EditButton } from 'react-admin';
import { ContentField } from '../customFields/ContentField';

const CommentsDatagrid = () => (
  <Datagrid rowClick="show">
    <TextField source="id" />
    <ContentField source="content" label="Content" />
    <DateField source="publishDate" label="Publication date" locales="uk-UA" showTime />
    <ReferenceField source="userId" reference="users" label="Author">
      <TextField source="login" />
    </ReferenceField>
    <ReferenceField source="eventId" reference="events">
      <TextField source="name" />
    </ReferenceField>
    <EditButton />
  </Datagrid>
);

export default CommentsDatagrid;
