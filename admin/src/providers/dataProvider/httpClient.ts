import { fetchUtils } from 'react-admin';

const httpClient = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('accessToken');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
};

export default httpClient;
