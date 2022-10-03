import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';

const loginRoute = Router();
const userController = new UserController();

loginRoute.post(
  '/',
  loginValidation.loginValidation,
  (req: Request, res: Response, next: NextFunction) => userController.login(req, res, next),
);

// loginRoute.get('/validate', userController.)

export default loginRoute;
