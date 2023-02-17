import { Admin, Resource } from 'react-admin';
import { EventList } from './components/events/EventList';
import dataProvider from './dataProvider';
import authProvider from './auth/auth-provider';

import companies from './components/companies';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource
      name="events"
      list={EventList}
      // show={UserShow}
      // edit={UserEdit}
      // create={UserCreate}
    />
    <Resource name="companies" {...companies} />
  </Admin>
);

export default App;
