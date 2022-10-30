import { getApiResources } from '../app/config/api-resources';

export const environment = {
  production: true,
  apiResources: getApiResources(),
  apiURL: 'http://192.168.92.2:3000/api'
};
