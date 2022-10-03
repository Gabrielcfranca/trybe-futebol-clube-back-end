import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/httpError';
import loginSchema from '../helpers/Joi';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    const [status, message] = error.message.split('|');
    throw new HttpError(Number(status), message);
  }
  next();
};

export default loginValidation;
