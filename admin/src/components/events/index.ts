import EventCreate from './EventCreate';
import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';

const resource = {
  list: EventList,
  show: EventShow,
  create: EventCreate,
  edit: EventEdit,
};

export default resource;
