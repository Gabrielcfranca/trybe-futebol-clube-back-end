import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private _matchService: MatchService;
  constructor(service: MatchService = new MatchService()) {
    this._matchService = service;
  }

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const matches = await this._matchService.findAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  // public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const { id } = req.params;
  //   try {
  //     const byId = await this._matchService.getById(id);
  //     res.status(200).json(byId);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
