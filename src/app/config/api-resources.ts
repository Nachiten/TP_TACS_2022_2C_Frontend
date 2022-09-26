export const getApiResources = () => ({
  test: {
    getHealth: () => '/health'
  },
  matches: {
    matches: () => '/matches',
    matchById: (id: string) => `/matches/${id}`,
    matchPlayers: (id: string) => `/matches/${id}/players`
  },
  statistics: {
    statisticsPlayers: () => '/statistics/players',
    statisticsMatches: () => '/statistics/matches'
  }
});
