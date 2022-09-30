import { Request, Response } from 'express';
import UserService from '../services/UserService';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'validateToken';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login({ email, password });
      // if (!result) return res.status(400).json({ message: 'Invalid fields' });
      const tokenJwt = jwt.sign({ email, password }, JWT_SECRET, {
        expiresIn: '6d',
      });
      return res.status(200).json({ tokenJwt });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}
