const mockMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 45,
    "homeTeam": 5,
    "homeTeamGoals": 1,
    "awayTeam": 3,
    "awayTeamGoals": 1,
    "inProgress": true,
    "teamHome": {
      "teamName": "Cruzeiro"
    },
    "teamAway": {
      "teamName": "Botafogo"
    }
  },
]

const mockTeam = {
  id: 3,
  teamName: "Botafogo"
};

const mockValidMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const mockNewMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
};

const mockInvalidMatchTeams = {
  homeTeam: 9999,
  awayTeam: 9998,
  homeTeamGoals: 2,
  awayTeamGoals: 0,
};

export {
  mockMatches,
  mockInvalidMatchTeams,
  mockTeam,
  mockNewMatch,
  mockValidMatch
};