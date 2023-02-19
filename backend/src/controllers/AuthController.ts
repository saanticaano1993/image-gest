import { Request, Response } from "express";
import { ZodError } from "zod";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { generateToken } from "../lib/jwt";
import { UserModel } from "../models/UserModel";
import { loginSchema, registerSchema } from "../validation/auth";

export default {
  getCurrentUserInfo,
  loginHandler,
  registerHandler,
};

async function loginHandler(req: Request, res: Response) {
  // Add user to req.user
  const loggedInUser = req.user;

  if (loggedInUser) {
    return res.status(400).json({ message: "You are already logged in" });
  }

  // Validation
  let username = "";
  let password = "";

  try {
    const result = loginSchema.parse(req.body);
    username = result.username;
    password = result.password;
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Check if user exists
  const user = await UserModel.findOne({ username });
  if (!user?.id) {
    return res.status(400).json({ message: "User not found" });
  }

  const userPassword = user?.password;
  const isPasswordCorrect = await comparePassword(password, userPassword);

  // Check if password is correct
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect credentials" });
  }
  // Create token
  const token = generateToken(user.id);

  // Send token
  (user.password as string | undefined) = undefined;

  res.json({ token, user });
}

async function registerHandler(req: Request, res: Response) {
  // Add user to req.user
  const loggedInUser = req.user;

  if (loggedInUser) {
    return res.status(400).json({ message: "You are already logged in" });
  }

  // Validation
  let username = "";
  let password = "";
  let email = "";
  try {
    const result = registerSchema.parse(req.body);
    username = result.username;
    password = result.password;
    email = result.email;
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Check if user exists
  const userWithSameUsername = await UserModel.findOne({ username });
  const userWithSameEmail = await UserModel.findOne({ email });
  if (userWithSameUsername?.id || userWithSameEmail?.id) {
    return res.status(400).json({ message: "User already registered" });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
    email,
  });

  return res.json({ user: newUser });
}

async function getCurrentUserInfo(req: Request, res: Response) {
  if (!req.user) {
    return res.status(200).json({});
  }

  const user = req.user;
  (user.password as string | undefined) = undefined;

  (user.images as any) = undefined;
  return res.json({ user });
}
