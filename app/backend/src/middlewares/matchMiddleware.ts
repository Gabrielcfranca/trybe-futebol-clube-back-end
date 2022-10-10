import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/httpError';

class MatchMiddleware {
  private fieldsValidation = (homeTeam: number, awayTeam: number): void => {
    if (homeTeam === awayTeam) {
      throw new HttpError(
        'It is not possible to create a match with two equal teams',
        401,
      );
    }
  };

  public matchMiddlewareValidation = (req: Request, _res: Response, next: NextFunction): void => {
    const { homeTeam, awayTeam } = req.body;
    this.fieldsValidation(homeTeam, awayTeam);
    next();
  };
}

export default MatchMiddleware;
