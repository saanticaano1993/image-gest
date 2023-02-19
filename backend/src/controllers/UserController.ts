import { Request, Response } from "express";
import { ZodError } from "zod";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { UserModel } from "../models/UserModel";
import { updateUserSchema } from "../validation/user";

export default {
  updateUser,
};

async function updateUser(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized, you must be logged in to modify your user",
    });
  }

  if (req.params.userId !== String(req.user._id)) {
    return res.status(401).json({
      message: "Unauthorized, you can only modify your own user",
    });
  }

  let oldPassword = "";
  let username: string | undefined = undefined;
  let newPassword: string | undefined = undefined;
  try {
    const result = updateUserSchema.parse(req.body);
    username = result.username;
    oldPassword = result.oldPassword;
    newPassword = result.newPassword;
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  // Upgrading
  const isPasswordCorrect = await comparePassword(
    oldPassword,
    req.user.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password",
    });
  }

  if (newPassword) {
    newPassword = await hashPassword(newPassword);
  }

  // deletion of password field
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      username,
      password: newPassword,
    },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  (updatedUser as any).password = undefined;
  return res.status(200).json(updatedUser);
}
