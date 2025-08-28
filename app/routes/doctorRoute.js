import express from "express";
import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../../middleware/authDoctor.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
const doctorRouter = express.Router();

doctorRouter.post("/login", async (req, res, next) => {
  try {
    await loginDoctor(req, res, next);
  } catch (error) {
    next(error);
  }
});
doctorRouter.post("/cancel-appointment", authenticateJwtToken, appointmentCancel);
doctorRouter.get("/appointments", authenticateJwtToken, appointmentsDoctor);
doctorRouter.get("/list", authenticateJwtToken, doctorList);
doctorRouter.post("/change-availability", authenticateJwtToken, changeAvailablity);
doctorRouter.post("/complete-appointment", authenticateJwtToken, appointmentComplete);
doctorRouter.get("/dashboard", authenticateJwtToken, doctorDashboard);
doctorRouter.get("/profile", authenticateJwtToken, doctorProfile);
doctorRouter.post("/update-profile", authenticateJwtToken, updateDoctorProfile);

export default doctorRouter;
