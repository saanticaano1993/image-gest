import mongoose from "mongoose";
import config from "../config";

mongoose.set("strictQuery", true);

export const mongoDbConnect = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
