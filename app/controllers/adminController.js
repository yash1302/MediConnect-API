import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import utils from "../../common/utils.js";
import { adminMessages } from "../messages/adminMessages.js";
import adminServices from "../service/adminService.js";
import userService from "../service/userService.js";

const { uploadFromBuffer, generateJwtToken, hashPassword } = utils;
const {
  UNAUTHORIZED,
  ALREADYEXISTS,
  DOCTORCREATEDSUCCESS,
  APPOINTMENTCANCELLEDSUCESS,
} = adminMessages;
const {
  getDoctorDataService,
  createNewDoctorService,
  getAllAppointmentsService,
  getDoctorDataByIdService,
  getAllDoctorsService,
  getAllUsersService,
} = adminServices;

const {
  cancelAppointmentService,
  getAppointmentDetailsService,
  updateSlotsForDoctorService,
} = userService;

// API for admin login
const loginAdmin = async (email, password) => {
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const tokenData = {
        role: "admin",
        email: email,
      };
      const token = generateJwtToken(tokenData);
      return token;
    } else {
      throw UNAUTHORIZED;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsService();
    return appointments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const appointmentCancel = async (appointmentId) => {
  try {
    const appointmentData = await getAppointmentDetailsService(appointmentId);
    await cancelAppointmentService(appointmentId);
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await getDoctorDataByIdService(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await updateSlotsForDoctorService(docId, slots_booked);

    return APPOINTMENTCANCELLEDSUCESS;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addDoctor = async (req) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    const existingDoctor = await getDoctorDataService(email);
    if (existingDoctor) {
      throw ALREADYEXISTS;
    }

    const hashedPassword = await hashPassword(password);
    const imageUpload = await uploadFromBuffer(imageFile.buffer);
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    await createNewDoctorService(doctorData);
    return DOCTORCREATEDSUCCESS;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const allDoctors = async () => {
  try {
    const doctors = await getAllDoctorsService();
    return doctors;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await getAllDoctorsService();
    const users = await getAllUsersService();
    const appointments = await getAllAppointmentsService();

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse(),
    };

    return dashData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
};
