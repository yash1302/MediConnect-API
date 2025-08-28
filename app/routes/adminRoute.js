import express from "express";
import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
} from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";
import authAdmin from "../../middleware/authAdmin.js";
import upload from "../../middleware/multer.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post(
  "/add-doctor",
  authenticateJwtToken,
  upload.single("image"),
  addDoctor
);
adminRouter.get("/appointments", authenticateJwtToken, appointmentsAdmin);
adminRouter.post(
  "/cancel-appointment",
  authenticateJwtToken,
  appointmentCancel
);
adminRouter.get("/all-doctors", authenticateJwtToken, allDoctors);
adminRouter.post(
  "/change-availability",
  authenticateJwtToken,
  changeAvailablity
);
adminRouter.get("/dashboard", authenticateJwtToken, adminDashboard);

export default adminRouter;
