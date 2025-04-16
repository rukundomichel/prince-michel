import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
};
