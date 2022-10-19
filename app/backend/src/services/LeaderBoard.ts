import { Op } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import { ILeaderMatch } from '../interfaces/IMatch';
import { ITeam } from '../interfaces/ITeam';

type typesTeams = 'home' | 'away' | 'both';

export default class LeaderBoardService {
  private _teamModel = TeamModel;
  private _matchModel = MatchModel;

  private boardData = (name: string): ILeaderBoard => ({
    name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '0',
  });

  private findFinishedMatches = {
    home: async (id: number): Promise<ILeaderMatch[]> => this._matchModel
      .findAll({ where: { [Op.and]: [{ inProgress: false }, { homeTeam: id }] } }),
    away: async (id: number): Promise<ILeaderMatch[]> => this._matchModel
      .findAll({ where: { [Op.and]: [{ inProgress: false }, { awayTeam: id }] } }),
    both: async (id: number): Promise<ILeaderMatch[]> => this._matchModel
      .findAll({ where: {
        [Op.and]: [
          { inProgress: false },
          { [Op.or]: [{ homeTeam: id }, { awayTeam: id }] },
        ] } }),
  };

  private teamsHomeAndAway = {
    home: (match: ILeaderMatch, _id: number): number[] =>
      [match.homeTeamGoals, match.awayTeamGoals],
    away: (match: ILeaderMatch, _id: number): number[] =>
      [match.awayTeamGoals, match.homeTeamGoals],
    both: (match: ILeaderMatch, id: number): number[] => {
      if (match.homeTeam === id) return [match.homeTeamGoals, match.awayTeamGoals];
      return [match.awayTeamGoals, match.homeTeamGoals];
    },
  };

  private winsAndLoses = (homeGoals: number, awayGoals: number): number[] => {
    if (homeGoals > awayGoals) return [1, 0, 0];
    if (homeGoals === awayGoals) return [0, 1, 0];
    return [0, 0, 1];
  };

  private teamsBoard = (
    matches: ILeaderMatch[],
    team: ITeam,
    board: typesTeams,
  ): ILeaderBoard => {
    const tableResult = matches.reduce((acc, crr) => {
      const [hometeam, awayteam] = this.teamsHomeAndAway[board](crr, team.id);
      const [wins, draws, losses] = this.winsAndLoses(hometeam, awayteam);

      return {
        ...acc,
        totalVictories: acc.totalVictories + wins,
        totalDraws: acc.totalDraws + draws,
        totalLosses: acc.totalLosses + losses,
        goalsFavor: acc.goalsFavor + hometeam,
        goalsOwn: acc.goalsOwn + awayteam,
        totalGames: acc.totalGames + 1,
      };
    }, this.boardData(team.teamName));
    return tableResult;
  };

  private getBoard = async (board: typesTeams): Promise<ILeaderBoard[]> => {
    const teams = await TeamModel.findAll();
    const board1 = await Promise.all(teams.map(async (team) => {
      const matches = await this.findFinishedMatches[board](team.id);

      const teamsForBoard = this.teamsBoard(matches, team, board);
      return teamsForBoard;
    }));
    return board1;
  };

  private efficientCalc = (board1: ILeaderBoard[]): ILeaderBoard[] => {
    const board2 = board1.map((team) => {
      const totalPoints = (team.totalVictories * 3) + team.totalDraws;
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const efficiency = ((totalPoints / (team.totalGames * 3)) * 100).toFixed(2);

      return {
        ...team,
        totalPoints,
        goalsBalance,
        efficiency,
      };
    });
    return board2;
  };

  private sortedTeamsBoard = (board2: ILeaderBoard[]): ILeaderBoard[] => {
    const sortTeamsBoard = board2.sort((a, b) => {
      switch (true) {
        case a.totalPoints !== b.totalPoints:
          return b.totalPoints - a.totalPoints;
        case a.goalsBalance !== b.goalsBalance:
          return b.goalsBalance - a.goalsBalance;
        case a.goalsFavor !== b.goalsFavor:
          return b.goalsFavor - a.goalsFavor;
        default:
          return a.goalsOwn - b.goalsOwn;
      }
    });
    return sortTeamsBoard;
  };

  public leaderBoards = async (board: typesTeams): Promise<ILeaderBoard[]> => {
    const board1 = await this.getBoard(board);
    const board2 = this.efficientCalc(board1);
    const sortedBoard = this.sortedTeamsBoard(board2);
    return sortedBoard;
  };
}
