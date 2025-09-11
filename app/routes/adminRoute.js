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
import { responseHandler } from "../../common/MessageHandler.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { KEYWORDS } from "../../constants/keywords.constants.js";
import { adminRoutesConstants } from "../../constants/routes.constants.js";
const { ADMIN } = KEYWORDS;
const adminRouter = express.Router();
const {
  LOGIN,
  ADDDOCTOR,
  APPOINTMENTS,
  CANCELAPPOINTMENT,
  ALLDOCTORLIST,
  CHANGEAVAILABILITY,
  DASHBOARD,
} = adminRoutesConstants;

adminRouter.post(LOGIN, async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    const result = await loginAdmin(email, password);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

adminRouter.post(
  ADDDOCTOR,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const result = await addDoctor(req);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.get(
  APPOINTMENTS,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  async (req, res, next) => {
    try {
      const result = await appointmentsAdmin();
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.post(
  CANCELAPPOINTMENT,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const result = await appointmentCancel(appointmentId);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.get(
  ALLDOCTORLIST,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  async (req, res, next) => {
    try {
      const result = await allDoctors();
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.post(
  CHANGEAVAILABILITY,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  async (req, res, next) => {
    try {
      const { docId } = req.body;
      const result = await changeAvailablity(docId);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.get(
  DASHBOARD,
  authenticateJwtToken,
  authorizeRole(ADMIN),
  async (req, res, next) => {
    try {
      const result = await adminDashboard(req, res);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default adminRouter;
