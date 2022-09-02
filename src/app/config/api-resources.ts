const apiURL = 'http://localhost:3000';

export const getApiResources = () => ({
  test: {
    getHealth: () => apiURL + '/api/test/health'
  },
  matches: {
    matches: () => apiURL + '/api/matches',
    matchById: (id: string) => apiURL + `/api/matches/${id}`
  }
});
