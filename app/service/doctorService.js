import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

const getAppointmentsForDoctorService = async (docId) => {
  try {
    const appointments = await appointmentModel
      .find({ docId })

    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDoctorAvailabilityService = async (docId, availability) => {
  try {
    const doctor = await doctorModel.findByIdAndUpdate(docId, {
      available: availability,
    });
    return doctor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const completeAppointmentService = async (appointmentId) => {
  try {
    const result = await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDoctorProfileService = async (docId, profileData) => {
  try {
    const result = await doctorModel.findByIdAndUpdate(docId, profileData, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAppointmentsForDoctorService,
  updateDoctorAvailabilityService,
  completeAppointmentService,
  updateDoctorProfileService
};
