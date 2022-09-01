export const getApiResources = () => ({
  test: {
    getHealth: () => '/api/test/health'
  },
  matches: {
    matches: () => '/api/matches',
    matchById: (id: string) => `/api/matches/${id}`
  }
});
