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
import { responseHandler } from "../../common/MessageHandler.js";
const doctorRouter = express.Router();

doctorRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginDoctor(email, password);
    res.status(200).send(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

doctorRouter.post(
  "/cancel-appointment",
  authDoctor,
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
  "/appointments",
  authDoctor,
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
doctorRouter.get("/list", async (req, res, next) => {
  try {
    const result = await doctorList();
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

doctorRouter.post(
  "/change-availability",
  authDoctor,
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
  "/complete-appointment",
  authDoctor,
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

doctorRouter.get("/dashboard", authDoctor, async (req, res, next) => {
  try {
    const { userId } = res?.locals;
    const result = await doctorDashboard(userId);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

doctorRouter.get("/profile", authDoctor, async (req, res, next) => {
  try {
    const { userId } = res?.locals;
    const result = await doctorProfile(userId);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});
doctorRouter.post(
  "/update-profile",
  authDoctor,
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const { fees, address, available } = req.body;
      const result = await updateDoctorProfile(
        userId,
        fees,
        address,
        available
      );
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default doctorRouter;
