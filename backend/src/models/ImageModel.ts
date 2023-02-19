import mongoose from "mongoose";
import { IImage } from "./types";

const ImageSchema = new mongoose.Schema<IImage>({
  title: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadDate: {
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  },
  filesize: {
    type: Number,
    required: true,
  },
  dimensions: {
    type: {
      width: Number,
      height: Number,
    },
    required: true,
  },
});

export const ImageModel = mongoose.model("Image", ImageSchema);
