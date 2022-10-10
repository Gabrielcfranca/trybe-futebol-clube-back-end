import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchController from '../controllers/MatchController';
import MatchMiddleware from '../middlewares/matchMiddleware';

const matchRouter = Router();
const matchController = new MatchController();
const middleware = new MatchMiddleware();

matchRouter.get(
  '/',
  matchController.findAll,
);

matchRouter.post(
  '/',
  tokenValidation,
  middleware.matchMiddlewareValidation,
  matchController.createMatches,
);

matchRouter.patch(
  '/:id/finish',
  matchController.finishedMatches,
);

matchRouter.patch(
  '/:id',
  matchController.updateInProgressMatches,
);

export default matchRouter;
