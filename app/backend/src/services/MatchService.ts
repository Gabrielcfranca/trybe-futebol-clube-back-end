import Match from '../database/models/MatchModel';
// import HttpError from '../errors/httpError';
import { IMatch, IMatchTeams } from '../interfaces/IMatch';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  private _model = Match;

  public findAll = async (): Promise<IMatch[]> => {
    const matches = await this._model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as IMatchTeams[];
  };

  // public getById = async (id: string): Promise<IMatch> => {
  //   const byId = await this._model.findByPk(id);
  //   if (!byId) throw new HttpError(404, 'Team not found');
  //   return byId;
  // };
}
