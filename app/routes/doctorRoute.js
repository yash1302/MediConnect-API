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
  getPatientsForDoctor,
} from "../controllers/doctorController.js";
import { responseHandler } from "../../common/MessageHandler.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { doctorRoutesConstants } from "../../constants/routes.constants.js";
import { KEYWORDS } from "../../constants/keywords.constants.js";

const doctorRouter = express.Router();

const {
  LOGIN,
  CANCELAPPOINTMENT,
  APPOINTMENTS,
  DOCTORLIST,
  CHANGEAVAILABILITY,
  COMPLETEAPPOINTMENT,
  DASHBOARD,
  PROFILE,
  UPDATEPROFILE,
  GETPATIENTSFORDOCTOR,
} = doctorRoutesConstants;

const { DOCTOR } = KEYWORDS;

doctorRouter.post(LOGIN, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginDoctor(email, password);
    res.status(200).send(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

doctorRouter.post(
  CANCELAPPOINTMENT,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const { userId } = res?.locals;
      const result = await appointmentCancel(userId, appointmentId);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.get(
  APPOINTMENTS,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const result = await appointmentsDoctor(userId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.get(DOCTORLIST, async (req, res, next) => {
  try {
    const result = await doctorList();
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

doctorRouter.post(
  CHANGEAVAILABILITY,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const result = await changeAvailablity(userId);
      res.status(200).send(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.post(
  COMPLETEAPPOINTMENT,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const { userId } = res?.locals;
      const result = await appointmentComplete(userId, appointmentId);
      res.status(result.statusCode || 200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.get(
  DASHBOARD,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const result = await doctorDashboard(userId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.get(
  PROFILE,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const result = await doctorProfile(userId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.post(
  UPDATEPROFILE,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const { fees, address, available, about } = req.body;
      const result = await updateDoctorProfile(
        userId,
        fees,
        address,
        available,
        about
      );
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

doctorRouter.get(
  GETPATIENTSFORDOCTOR,
  authenticateJwtToken,
  authorizeRole(DOCTOR),
  async (req, res, next) => {
    try {
      const { userId: doctorId } = res?.locals;
      const result = await getPatientsForDoctor(doctorId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default doctorRouter;
