import { Admin, Resource } from 'react-admin';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import companies from './components/companies';
import events from './components/events';
import { formats, themes } from './components/formats-themes';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource name="events" {...events} />
    <Resource name="companies" {...companies} />
    <Resource name="formats" {...formats} />
    <Resource name="themes" {...themes} />
  </Admin>
);

export default App;
