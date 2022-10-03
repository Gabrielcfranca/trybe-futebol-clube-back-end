import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ReqData, TokenData } from '../interfaces/jwtInterface';
import UserService from '../services/UserService';

const JWT_SECRET = 'validateToken';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await this.userService.login({ email, password });
      // if (!result) return res.status(400).json({ message: 'Invalid fields' });
      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: '6d',
      });
      next();
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  public role = async (req: ReqData, res: Response, next: NextFunction) => {
    try {
      const { data } = req;
      const { email } = data as TokenData;
      const roleEmail = await this.userService.role(email);
      return res.status(200).json(roleEmail);
    } catch (error) {
      next(error);
    }
  };
}
