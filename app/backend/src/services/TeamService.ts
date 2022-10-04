import { ITeam } from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';
import HttpError from '../errors/httpError';

export default class TeamService {
  private _model = TeamModel;

  public findAll = async (): Promise<ITeam[]> => {
    const team = await this._model.findAll();

    return team;
  };

  public getById = async (id: string): Promise<ITeam> => {
    const byId = await this._model.findByPk(id);
    if (!byId) throw new HttpError('Team not found', 404);
    return byId;
  };
}
