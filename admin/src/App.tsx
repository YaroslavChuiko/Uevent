import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './auth/auth-provider';

import companies from './components/companies';
import events from './components/events';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource name="events" {...events} />
    <Resource name="companies" {...companies} />
  </Admin>
);

export default App;
