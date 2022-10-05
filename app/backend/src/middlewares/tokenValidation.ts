import { NextFunction, Response } from 'express';
import { ReqData, TokenData } from '../interfaces/jwtInterface';
import { verifyToken } from '../helpers/token';

const tokenValidation = (req: ReqData, res: Response, next: NextFunction):
Response | void => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not Found' });
  }
  try {
    const result = verifyToken(token);
    // console.log(req.userId, 'log req.userId');
    // console.log(result, 'log result');
    req.data = result as TokenData;
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
