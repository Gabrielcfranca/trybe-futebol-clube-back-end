import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';
import LeaderBoardService from '../services/LeaderBoard';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController(new LeaderBoardService());

leaderBoardRouter.get(
  '/',
  leaderBoardController.mainBoard,
);

leaderBoardRouter.get('/home', leaderBoardController.homeBoard);

leaderBoardRouter.get('/away', leaderBoardController.awayBoard);

export default leaderBoardRouter;
