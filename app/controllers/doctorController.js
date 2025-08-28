import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import adminService from "../service/adminService.js";
import { doctorMessages } from "../messages/doctorMessages.js";
import utils from "../../common/utils.js";
import userService from "../service/userService.js";
import doctorService from "../service/doctorService.js";

const { getDoctorDataByIdService, getDoctorDataService } = adminService;
const { DOCTORNOTAVAILABLE, LOGINFAILURE, UNAUTHORIZED, APPOINTMENTCANCELLED } =
  doctorMessages;
const { verifyPassword, generateJwtToken } = utils;
const {
  getAppointmentDetailsService,
  cancelAppointmentService,
  updateSlotsForDoctorService,
} = userService;
const { getAppointmentsForDoctorService, updateDoctorAvailabilityService } =
  doctorService;

// API for doctor Login
const loginDoctor = async (email, password) => {
  try {
    const user = await getDoctorDataService(email);

    if (!user) {
      throw LOGINFAILURE;
    }

    const isMatch = await verifyPassword(password, user.password);

    if (isMatch) {
      const tokenData = {
        userId: user._id,
        email: user.email,
        name: user.name,
        isDoctor: user.role,
      };
      const token = await generateJwtToken(tokenData);
      return token;
    } else {
      throw UNAUTHORIZED;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const appointmentsDoctor = async (docId) => {
  try {
    const appointments = await getAppointmentsForDoctorService(docId);

    return appointments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const appointmentCancel = async (docId, appointmentId) => {
  try {
    const appointmentData = await getAppointmentDetailsService(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await cancelAppointmentService(appointmentId);
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await getDoctorDataByIdService(docId);

      let slots_booked = doctorData.slots_booked;

      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );

      await updateSlotsForDoctorService(docId, slots_booked);
      return APPOINTMENTCANCELLED;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    }

    res.json({ success: false, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (docId) => {
  try {
    const docData = await getDoctorDataByIdService(docId);
    await updateDoctorAvailabilityService(docId, !docData.available);
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
