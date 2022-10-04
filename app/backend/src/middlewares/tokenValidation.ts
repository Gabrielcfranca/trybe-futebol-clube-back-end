import { NextFunction, Response } from 'express';
import { ReqData, TokenData } from '../interfaces/jwtInterface';
import { verifyToken } from '../helpers/token';

const tokenValidation = (req: ReqData, res: Response, next: NextFunction): TokenData | void => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not Found' });
    return;
  }
  try {
    const result = verifyToken(token);
    // console.log(req.userId, 'log req.userId');
    console.log(result, 'log result');
    // req.data = result;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
