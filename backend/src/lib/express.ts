import { Request } from "express";

export const parseToken = (req: Request) => {
  const authorization = req.headers.authorization?.trim();
  if (!authorization) return null;
  const token = authorization.split(" ")[1];
  return token.trim();
};
