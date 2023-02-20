import { List, TextInput } from 'react-admin';
import CommentsDatagrid from './CommentsDatagrid';

const filters = [<TextInput source="q" label="Search" alwaysOn />];

const CommentsList = () => (
  <List filters={filters}>
    <CommentsDatagrid />
  </List>
);

export default CommentsList;
