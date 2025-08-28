import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { cloudConfig } from "./config/cloudinary.js";
import { mongoConfig } from "./config/mongodb.js";
dotenv.config();

export const mongoConnection = async () => {
  try {
    await mongoose.connect(mongoConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

cloudinary.config(cloudConfig);

export { cloudinary };
