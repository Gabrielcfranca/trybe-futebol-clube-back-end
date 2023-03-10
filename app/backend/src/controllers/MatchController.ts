import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private _matchService: MatchService;
  constructor(service: MatchService = new MatchService()) {
    this._matchService = service;
  }

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { inProgress } = req.query;
      // console.log(inProgress, 'inProgress Controller');
      let defineInProgress: boolean | undefined = inProgress === 'true';
      if (!inProgress) {
        defineInProgress = undefined;
      }
      const matches = await this._matchService.findAll(defineInProgress);
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public createMatches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const match = await this._matchService
        .createMatches({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
      // console.log(match);
      res.status(201).json(match);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };

  public finishedMatches = async (req: Request, res: Response, next: NextFunction)
  : Promise<void> => {
    try {
      const { id } = req.params;
      await this._matchService
        .finishedMatches(id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateInProgressMatches = async (req: Request, res: Response, next: NextFunction)
  : Promise<void> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this._matchService.updateInProgressMatches(id, homeTeamGoals, awayTeamGoals);
      res.status(200).json({ message: 'Updated' });
    } catch (error) {
      next(error);
    }
  };
}
