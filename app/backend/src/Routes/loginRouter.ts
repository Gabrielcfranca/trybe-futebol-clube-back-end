import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import UserController from '../controllers/UserController';
// import loginValidation from '../middlewares/loginValidation';
import UserMiddleware from '../middlewares/userMiddleware';
// import UserMiddleware from '../middlewares/userMiddleware';

const loginRoute = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

loginRoute.post(
  '/',
  userMiddleware.loginMiddlewareValidation,
  userController.login,
);

loginRoute.get('/validate', tokenValidation, userController.role);

export default loginRoute;
