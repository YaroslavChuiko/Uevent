import { fetchUtils, withLifecycleCallbacks } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import companiesCallbacks from './companiesCallbacks';
import eventsLifecycle from './eventsLifecycle';

const httpClient = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('accessToken');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
};
const baseDataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_URL, httpClient);

const dataProvider = withLifecycleCallbacks(baseDataProvider, [companiesCallbacks, eventsLifecycle]);

export { httpClient };
export default dataProvider;
