import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { getCurrentUserMiddleware } from "../middlewares/auth";

const authRouter = Router();

authRouter.get(
  "/me",
  getCurrentUserMiddleware,
  AuthController.getCurrentUserInfo
);
authRouter.post(
  "/login",
  getCurrentUserMiddleware,
  AuthController.loginHandler
);
authRouter.post(
  "/register",
  getCurrentUserMiddleware,
  AuthController.registerHandler
);

export default authRouter;
