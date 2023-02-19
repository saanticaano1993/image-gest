import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
