import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _teamService: TeamService;
  constructor(service: TeamService = new TeamService()) {
    this._teamService = service;
  }

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await this._teamService.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const byId = await this._teamService.getById(id);
      res.status(200).json(byId);
    } catch (error) {
      next(error);
    }
  };
}
