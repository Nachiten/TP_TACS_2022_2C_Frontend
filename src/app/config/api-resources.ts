export const getApiResources = () => ({
  test: {
    getHealth: () => +'/api/health'
  },
  matches: {
    matches: () => +'/api/matches',
    matchById: (id: string) => +`/api/matches/${id}`,
    matchPlayers: (id: string) => +`/api/matches/${id}/players`
  },
  statistics: {
    statisticsPlayers: () => +'/api/statistics/players',
    statisticsMatches: () => +'/api/statistics/matches'
  }
});
