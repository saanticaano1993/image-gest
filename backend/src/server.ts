import express, { Request, Response } from "express";
import config from "./config";
import { mongoDbConnect } from "./lib/mongoose";
import authRouter from "./routers/auth";
import imagesRouter from "./routers/images";
import usersRouter from "./routers/users";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/api/auth", authRouter);
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);

export default app;
