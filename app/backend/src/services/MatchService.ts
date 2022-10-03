// import { ITeam } from '../interfaces/ITeam';
import { ITeam } from '../interfaces/ITeam';
import Match from '../database/models/MatchModel';
import HttpError from '../errors/httpError';

export default class MatchService {
  private _model = Match;

  public findAll = async (): Promise<ITeam[]> => {
    const matches = await this._model.findAll();

    return matches;
  };

  public getById = async (id: string): Promise<ITeam> => {
    const byId = await this._model.findByPk(id);
    if (!byId) throw new HttpError(404, 'Team not found');
    return byId;
  };
}
