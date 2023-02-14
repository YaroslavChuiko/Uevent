import { fetchUtils, Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { EventList } from './components/events/EventList';
import authProvider from './auth/auth-provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpClient = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('accessToken');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_URL, httpClient);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    <Resource
      name="events"
      list={EventList}
      // show={UserShow}
      // edit={UserEdit}
      // create={UserCreate}
    />
  </Admin>
);

export default App;
