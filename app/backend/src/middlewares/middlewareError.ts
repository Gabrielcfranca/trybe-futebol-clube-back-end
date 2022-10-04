import { Request, Response, NextFunction } from 'express';

export interface IError extends Error {
  status: number;
}

export default class MiddlewareError {
  public handleError = (error: IError, _req: Request, res: Response, _next: NextFunction):void => {
    res.status(error.status).json({ message: error.message });
  };
}
