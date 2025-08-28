import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

const getDoctorDataService = async (email) => {
  try {
    const result = await doctorModel.findOne({ email });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDoctorDataByIdService = async (docId) => {
  try {
    const result = await doctorModel.findById(docId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNewDoctorService = async (doctorData) => {
  try {
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return newDoctor;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllAppointmentsService = async () => {
  try {
    const appointments = await appointmentModel.find({});
    return appointments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllDoctorsService = async () => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return doctors;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllUsersService = async () => {
  try {
    const users = await userModel.find({}).select("-password");
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getDoctorDataService,
  createNewDoctorService,
  getAllAppointmentsService,
  getDoctorDataByIdService,
  getAllDoctorsService,
  getAllUsersService,
};
