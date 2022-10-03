import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => teamController.findAll(req, res, next),
);

// teamRouter.get('/validate', userController.)

export default teamRouter;
