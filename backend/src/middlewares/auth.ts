import { Request, Response, NextFunction } from "express";
import { parseToken } from "../lib/express";
import { verifyToken } from "../lib/jwt";
import { UserModel } from "../models/UserModel";

export const getCurrentUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if user is logged in
  const authToken = parseToken(req);

  if (!authToken) {
    req.user = undefined;
    return next();
  }
  // verify token
  const loggedInUserId = verifyToken(authToken);

  if (!loggedInUserId) {
    req.user = undefined;
    return next();
  }

  // If yes, attach user to req.user
  const user = await UserModel.findById(loggedInUserId);

  if (!user) {
    req.user = undefined;
    return next();
  }

  req.user = user;
  next();
};
