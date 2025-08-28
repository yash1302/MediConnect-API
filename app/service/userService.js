import userModel from "../models/userModel.js";

const signupUserService = async (userData) => {
  try {
    const newUser = new userModel(userData);
    await newUser.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findUserService = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserDataService = async (userId) => {
  try {
    const user = await userModel.findById(userId).select("-password");
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateProfileService = async (userId, userData) => {
  try {
    const result = await userModel.findByIdAndUpdate(userId, userData);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  signupUserService,
  findUserService,
  getUserDataService,
  updateProfileService,
};
