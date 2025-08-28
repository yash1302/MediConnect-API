import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
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

const getDoctorDataService = async (docId) => {
  try {
    const doctor = await doctorModel.findById(docId).select("-password");
    return doctor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAppointmentsForUserService = async (userId) => {
  try {
    const appointments = await appointmentModel.find({ userId });
    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAppointmentDetailsService = async (appointmentId) => {
  try {
    const appointment = await appointmentModel.findById(appointmentId);
    return appointment;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const cancelAppointmentService = async (appointmentId) => {
  try {
    const result = await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSlotsForDoctorService = async (docId, slots_booked) => {
  try {
    const result = await doctorModel.findByIdAndUpdate(docId, { slots_booked });
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
  getDoctorDataService,
  getAppointmentsForUserService,
  getAppointmentDetailsService,
  cancelAppointmentService,
  updateSlotsForDoctorService
};
