import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';

const loginRoute = Router();
const userController = new UserController();

loginRoute.post(
  '/',
  loginValidation,
  userController.login,
);

loginRoute.get('/validate', loginValidation, userController.role);

export default loginRoute;
