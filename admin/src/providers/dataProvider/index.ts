import jsonServerProvider from 'ra-data-json-server';
import { withLifecycleCallbacks } from 'react-admin';
import companiesLifecycle from './companiesLifecycle';
import eventsLifecycle from './eventsLifecycle';
import { formatsLifecycle, themesLifecycle } from './formatThemeLifecycle';
import commentsLifecycle from './commentsLifecycle';
import usersLifecycle from './usersLifecycle';
import promocodeLifecycle from './promocodeLifecycle';
import httpClient from './httpClient';

const baseDataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_URL, httpClient);

const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  companiesLifecycle,
  eventsLifecycle,
  formatsLifecycle,
  themesLifecycle,
  commentsLifecycle,
  usersLifecycle,
  promocodeLifecycle,
]);

export default dataProvider;
