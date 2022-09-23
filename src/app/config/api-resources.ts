// const apiURL = 'http://192.168.92.2:3000';
const apiURL = 'http://localhost:3000';

export const getApiResources = () => ({
  test: {
    getHealth: () => apiURL + '/api/health'
  },
  matches: {
    matches: () => apiURL + '/api/matches',
    matchById: (id: string) => apiURL + `/api/matches/${id}`,
    matchPlayers: (id: string) => apiURL + `/api/matches/${id}/players`
  },
  statistics:{
    statisticsPlayers: (hours: number) => apiURL + '/api/statistics/players?hours='+hours,
    statisticsMatches: (hours: number) => apiURL + '/api/statistics/matches?hours='+hours
  }
});
