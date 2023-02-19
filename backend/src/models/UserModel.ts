import mongoose from "mongoose";
import { IUser } from "./types";

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Image",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  },
});

export const UserModel = mongoose.model("User", UserSchema);
