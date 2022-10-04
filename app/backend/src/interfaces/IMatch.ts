export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals?: number;
  awayTeam: number;
  awayTeamGoals?: number;
  inProgress: number;
}

export interface IMatchTeams extends IMatch {
  teamHome?: { teamName: string } | [{ teamName: string }],
  teamAway?: { teamName: string } | [{ teamAway: string }],
}
