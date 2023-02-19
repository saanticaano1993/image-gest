import { IUser } from "../../models/types";

export {};

declare global {
  namespace Express {
    interface Request {
      user: IUser | undefined;
    }
  }
}
