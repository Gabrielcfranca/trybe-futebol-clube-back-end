import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';

const loginRoute = Router();
const userController = new UserController();

loginRoute.post(
  '/',
  loginValidation.loginValidation,
  userController.login,
);

export default loginRoute;