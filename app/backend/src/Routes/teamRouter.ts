import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get(
  '/',
  teamController.findAll,
);

teamRouter.get('/:id', teamController.getById);

export default teamRouter;
