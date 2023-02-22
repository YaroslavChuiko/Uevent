import { Admin, Resource } from 'react-admin';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import companies from './components/companies';
import events from './components/events';
import { formats, themes } from './components/formats-themes';
import comments from './components/comments';
import users from './components/users';
import promoCodes from './components/promo-codes';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource name="events" {...events} />
    <Resource name="companies" {...companies} />
    <Resource name="formats" {...formats} />
    <Resource name="themes" {...themes} />
    <Resource name="comments" {...comments} />
    <Resource name="users" {...users} />
    <Resource name="promo-codes" options={{ label: 'Promo Codes' }} {...promoCodes} />
  </Admin>
);

export default App;
