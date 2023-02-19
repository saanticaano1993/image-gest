import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  images: mongoose.Schema.Types.ObjectId[];
  password: string;
  createdAt: mongoose.Schema.Types.Date;
}

export interface IImage {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  authorId: mongoose.Schema.Types.ObjectId;
  uploadDate: mongoose.Schema.Types.Date;
  filesize: number;
  dimensions: {
    width: number;
    height: number;
  };
}
