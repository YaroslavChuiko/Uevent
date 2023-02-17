import jsonServerProvider from 'ra-data-json-server';
import { withLifecycleCallbacks } from 'react-admin';
import companiesCallbacks from './companiesCallbacks';
import eventsLifecycle from './eventsLifecycle';
import httpClient from './httpClient';

const baseDataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_URL, httpClient);

const dataProvider = withLifecycleCallbacks(baseDataProvider, [companiesCallbacks, eventsLifecycle]);

export default dataProvider;
