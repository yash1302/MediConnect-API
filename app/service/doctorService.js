import appointmentModel from "../models/appointmentModel.js";

const getAppointmentsForDoctorService = async (docId) => {
  try {
    const appointments = await appointmentModel
      .find({ docId })
      .where("cancelled")
      .ne(true);
    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDoctorAvailabilityService = async (docId,availability) => {
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

export default {
  getAppointmentsForDoctorService,
  updateDoctorAvailabilityService
};
