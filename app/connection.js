import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { cloudConfig } from "./config/cloudinary.js";
import { mongoConfig } from "./config/mongodb.js";
dotenv.config();

let isConnected = false;

export const mongoConnection = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    const conn = await mongoose.connect(mongoConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail fast if unreachable
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

cloudinary.config(cloudConfig);

export { cloudinary };
