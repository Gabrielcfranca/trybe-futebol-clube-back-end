import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get(
  '/',
  matchController.findAll,
);

// matchRouter.get('/:id', matchController.getById);

export default matchRouter;
