import { Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import HttpError from '../errors/httpError';
import { ReqData, TokenData } from '../interfaces/jwtInterface';
import 'dotenv/config';
import { createToken } from '../helpers/token';

// const JWT_SECRET = process.env.JWT_SECRET || 'validateToken';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      await this.userService.login({ email, password });
      // if (!result) return res.status(400).json({ message: 'Invalid fields' });
      const token = createToken({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpError) {
        return res.status(401).json({ message: (error as HttpError).message });
      }
    }
  };

  public role = async (req: ReqData, res: Response) => {
    try {
      // console.log(req.data, 'log tokendata');
      const { data } = req;
      const { email } = data as TokenData;
      const roleEmail = await this.userService.role(email);
      return res.status(200).json(roleEmail);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpError) {
        return res.status(401).json({ message: (error as HttpError).message });
      }
    }
  };
}
