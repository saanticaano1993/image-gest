import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign(payload, config.JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
