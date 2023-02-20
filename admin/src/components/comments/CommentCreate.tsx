import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import { createSchema } from '../../validation/comments';

const CommentCreate = () => (
  <Create redirect="show">
    <SimpleForm resolver={createSchema}>
      <ReferenceInput source="eventId" reference="events">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="content" fullWidth multiline />
    </SimpleForm>
  </Create>
);

export default CommentCreate;
