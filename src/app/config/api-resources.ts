const apiURL = 'http://127.0.0.1:3000';

export const getApiResources = () => ({
  test: {
    getHealth: () => apiURL + '/api/health'
  },
  matches: {
    matches: () => apiURL + '/api/matches',
    matchById: (id: string) => apiURL + `/api/matches/${id}`
  }
});
