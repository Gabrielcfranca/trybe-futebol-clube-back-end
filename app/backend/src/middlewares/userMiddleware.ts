import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/httpError';
import { ILogin } from '../interfaces/ILogin';

class UserMiddleware {
  public name = 'user';

  private fieldsValidation = (data: ILogin): boolean => {
    if (!data.email || !data.password) return false;
    return true;
  };

  public loginMiddlewareValidation = (req: Request, _res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    const validationFields = this.fieldsValidation({ email, password });
    if (!validationFields) throw new HttpError('All fields must be filled', 400);
    next();
  };
}

export default UserMiddleware;
