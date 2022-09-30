import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

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
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}
