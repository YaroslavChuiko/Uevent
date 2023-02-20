import { DateField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';
import CommentTitle from './CommentTitle';

const CommentShow = () => (
  <Show title={<CommentTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="content" />
      <DateField source="publishDate" label="Publication date" locales="uk-UA" showTime />
      <ReferenceField source="userId" reference="users" label="Author">
        <TextField source="login" />
      </ReferenceField>
      <ReferenceField source="eventId" reference="events">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default CommentShow;
