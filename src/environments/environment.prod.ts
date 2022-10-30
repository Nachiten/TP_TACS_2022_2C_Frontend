import { getApiResources } from '../app/config/api-resources';

export const environment = {
  production: true,
  apiResources: getApiResources(),
  apiURL: '/api'
};
