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

  private setIds = async (home: number, away: number) => {
    const homeTeamID = await TeamModel.findByPk(home);
    console.log(homeTeamID, 'log home id setIDS');

    const awayTeamID = await TeamModel.findByPk(away);
    console.log(awayTeamID, 'log home id setIDS');
  };

  public createMatches = async (match: IMatch): Promise<IMatch> => {
    console.log(match, 'log match do service');
    await this.setIds(match.homeTeam, match.awayTeam);
    const matches = {
      ...match,
      inProgress: !match.inProgress,
      homeTeamGoals: !match.homeTeamGoals ? 0 : match.homeTeamGoals,
      awayTeamGoals: !match.awayTeamGoals ? 0 : match.awayTeamGoals,
    };
    const matchesCreated = await this._model.create(matches);
    // console.log(matches);
    return matchesCreated;
  };
}
