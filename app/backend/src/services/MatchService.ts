import Match from '../database/models/MatchModel';
// import HttpError from '../errors/httpError';
import { IMatch, IMatchTeams } from '../interfaces/IMatch';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  private _model = Match;

  public findAll = async (inProgress: boolean | undefined): Promise<IMatch[]> => {
    // console.log(inProgress, 'log do inProgress');
    if (inProgress === undefined) {
      const matches = await this._model.findAll({
        include: [
          { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return matches as IMatchTeams[];
    }
    const matches = await this._model.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as IMatchTeams[];
  };

  // private setIds = async (team: IMatch) => {
  //   const homeTeamID =
  // }

  public createMatches = async (match: IMatch): Promise<IMatch> => {
    console.log(match, 'log match do service');
    // const matches = await this._model.create({
    //   homeTeam,
    //   awayTeam,
    //   homeTeamGoals,
    //   awayTeamGoals,
    //   inProgress,
    //   include: [
    //     { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
    //     { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    //   ],
    // });
    const matches = await this._model.create(match);
    console.log(matches);
    return matches;
  };
}
