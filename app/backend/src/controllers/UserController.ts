import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import HttpError from '../errors/httpError';
import { ReqData, TokenData } from '../interfaces/jwtInterface';

const JWT_SECRET = 'validateToken';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      await this.userService.login({ email, password });
      // if (!result) return res.status(400).json({ message: 'Invalid fields' });
      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: '6d',
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpError) {
        return res.status(401).json({ message: (error as HttpError).message });
      }
    }
  };

  public role = async (req: ReqData, res: Response, next: NextFunction): Promise<void> => {
    const auth = req.headers.authorization;
    if (!auth) res.status(401).json({ message: 'Token not found' });
    try {
      const { data } = req;
      console.log(data, 'log tokendata');
      const { email } = data as TokenData;
      const roleEmail = await this.userService.role(email);
      res.status(200).json(roleEmail);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
