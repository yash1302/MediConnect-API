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
import { responseHandler } from "../../common/MessageHandler.js";
const adminRouter = express.Router();

adminRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    const result = await loginAdmin(email, password);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

adminRouter.post(
  "/add-doctor",
  authenticateJwtToken,
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
  "/appointments",
  authenticateJwtToken,
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
  "/cancel-appointment",
  authenticateJwtToken,
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
  "/all-doctors",
  authenticateJwtToken,
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
  "/change-availability",
  authenticateJwtToken,
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

adminRouter.get("/dashboard", authenticateJwtToken, async (req, res, next) => {
  try {
    const result = await adminDashboard(req, res);
    res.status(result.statusCode || 200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

export default adminRouter;
