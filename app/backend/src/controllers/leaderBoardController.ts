import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderBoard';

export default class LeaderboardController {
  constructor(private service: LeaderboardService) { }

  public mainBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.leaderBoards('both');
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public homeBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.leaderBoards('home');
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public awayBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.leaderBoards('away');
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
