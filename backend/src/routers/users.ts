import { Router } from "express";
import { getCurrentUserMiddleware } from "../middlewares/auth";
import UserController from "../controllers/UserController";

const usersRouter = Router();

usersRouter.put(
  "/:userId",
  getCurrentUserMiddleware,
  UserController.updateUser
);

export default usersRouter;
