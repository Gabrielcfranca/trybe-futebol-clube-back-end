import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get(
  '/',
  matchController.findAll,
);

matchRouter.post('/', tokenValidation, matchController.createMatches);

export default matchRouter;
