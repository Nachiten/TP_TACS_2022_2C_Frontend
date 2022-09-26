import { getApiResources } from '../app/config/api-resources';

export const environment = {
  production: false,
  apiResources: getApiResources(),
  apiURL: 'http://localhost:3000/api'
};
