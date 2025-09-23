import dotenv from "dotenv";
dotenv.config();

export const mongoConfig = {
  url: process.env.MONGODB_URI,
};

