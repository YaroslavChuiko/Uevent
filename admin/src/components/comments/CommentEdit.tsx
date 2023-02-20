import { Edit, SimpleForm, TextInput } from 'react-admin';
import { updateSchema } from '../../validation/comments';
import CommentTitle from './CommentTitle';

const CommentEdit = () => (
  <Edit title={<CommentTitle />}>
    <SimpleForm resolver={updateSchema}>
      <TextInput source="content" fullWidth multiline />
    </SimpleForm>
  </Edit>
);

export default CommentEdit;
