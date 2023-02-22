import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import UserShow from './UserShow';

const resource = {
  list: UserList,
  create: UserCreate,
  show: UserShow,
  edit: UserEdit,
};

export default resource;
