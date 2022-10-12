// import { Op } from 'sequelize';
// import Match from '../database/models/MatchModel';
// import { ILeaderMatch } from '../interfaces/IMatch';
// import TeamModel from '../database/models/TeamModel';
// import HttpError from '../errors/httpError';
// import ILeaderBoard from '../interfaces/ILeaderBoard';

// export default class LeaderBoardService {
//   constructor(
//     private _modelMatch = Match,
//     private _modelTeam = TeamModel,
//   ) {}

//   private dbLeader = (name: string): ILeaderBoard => ({
//     name,
//     totalPoints: 0,
//     totalGames: 0,
//     totalVictories: 0,
//     totalDraws: 0,
//     totalLosses: 0,
//     goalsFavor: 0,
//     goalsOwn: 0,
//     goalsBalance: 0,
//     efficiency: '0',
//   });

// private findMatches = {
//   home: async (id: number): Promise<ILeaderMatch[]> => this._modelMatch
//     .findAll({ where: { [Op.and]: [{ inProgress: false }, { homeTeam: id }] } }),

//   away: async (id: number): Promise<ILeaderMatch[]> => this._modelMatch
//     .findAll({ where: { [Op.and]: [{ inProgress: false }, { awayTeam: id }] } }),

//   both: async (id: number): Promise<ILeaderMatch[]> => this._modelMatch
//     .findAll({ where: {
//       [Op.and]: [
//         { inProgress: false },
//         { [Op.or]: [{ homeTeam: id }, { awayTeam: id }] },
//       ],
//     } }),
// };

// private setIds = async (home: number, away: number) => {
//   const homeTeamID = await TeamModel.findByPk(home);
//   // console.log(homeTeamID, 'log home id setIDS');

//   const awayTeamID = await TeamModel.findByPk(away);
//   // console.log(awayTeamID, 'log home id setIDS');
//   if (!homeTeamID || !awayTeamID) throw new HttpError('There is no team with such id!', 404);
// };

// public findAll = async (inProgress: boolean | undefined): Promise<IMatch[]> => {
//   // console.log(inProgress, 'log do inProgress');
//   if (inProgress === undefined) {
//     const matches = await this._model.findAll({
//       include: [
//         { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
//         { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
//       ],
//     });
//     return matches as IMatchTeams[];
//   }
//   const matches = await this._model.findAll({
//     where: { inProgress },
//     include: [
//       { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
//       { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
//     ],
//   });

//   return matches as IMatchTeams[];
// };

// public createMatches = async (match: IMatch): Promise<IMatch> => {
//   console.log(match, 'log match do service');
//   await this.setIds(match.homeTeam, match.awayTeam);
//   const matches = {
//     ...match,
//     inProgress: !match.inProgress,
//     homeTeamGoals: !match.homeTeamGoals ? 0 : match.homeTeamGoals,
//     awayTeamGoals: !match.awayTeamGoals ? 0 : match.awayTeamGoals,
//   };
//   const matchesCreated = await this._model.create(matches);
//   // console.log(matches);
//   return matchesCreated;
// };

// public finishedMatches = async (id: string): Promise<void> => {
//   const findMatch = await this._model.findByPk(id);
//   if (!findMatch) throw new HttpError('Match not Found', 404);
//   this._model.update({ inProgress: 'false' }, { where: { id } });
// };

// public updateInProgressMatches = async (id:string, homeTeamGoals: number, awayTeamGoals: number)
// : Promise<void> => {
//   const findMatch = await this._model.findByPk(id);
//   if (!findMatch) throw new HttpError('Match not Found', 404);
//   await this._model
//     .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
// };
// }
