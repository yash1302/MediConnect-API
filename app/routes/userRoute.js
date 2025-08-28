import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
} from "../controllers/userController.js";
import upload from "../../middleware/multer.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
import { userRoutesConstants } from "../../constants/routes.constants.js";
import { responseHandler } from "../../common/MessageHandler.js";
const userRouter = express.Router();

const {
  LOGIN,
  REGISTER,
  GETPROFILE,
  UPDATEPROFILE,
  BOOKAPPOINTMENT,
  APPOINTMENTS,
  CANCELAPPOINTMENT,
  PAYMENTRAZORPAY,
  VERIFYRAZORPAY,
  PAYMENTSTRIPE,
  VERIFYSTRIPE,
} = userRoutesConstants;

userRouter.post(REGISTER, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(200).json(new responseHandler(user));
  } catch (error) {
    next(error);
  }
});

userRouter.post(LOGIN, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(new responseHandler(user));
  } catch (error) {
    next(error);
  }
});

userRouter.get(GETPROFILE, authenticateJwtToken, async (req, res, next) => {
  try {
    const { userId } = res?.locals;
    const user = await getProfile(userId);
    res.status(200).json(new responseHandler(user));
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  UPDATEPROFILE,
  upload.single("image"),
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const user = await updateProfile(userId, req.body, req.file);
      res.status(200).json(new responseHandler(user));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  BOOKAPPOINTMENT,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { docId, slotDate, slotTime } = req.body;
      const { userId } = res?.locals;
      const appointment = await bookAppointment(
        userId,
        docId,
        slotDate,
        slotTime
      );
      res.status(200).json(new responseHandler(appointment));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(APPOINTMENTS, authenticateJwtToken, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const appointments = await listAppointment(userId);
    res.status(200).json(new responseHandler(appointments));
  } catch (error) {
    next(error);
  }
});
userRouter.post(
  CANCELAPPOINTMENT,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { userId, appointmentId } = req.body;
      const result = await cancelAppointment(userId, appointmentId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(
  PAYMENTRAZORPAY,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const payment = await paymentRazorpay(appointmentId);
      res.status(200).json(new responseHandler(payment));
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(
  VERIFYRAZORPAY,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { razorpay_order_id } = req.body;
      const result = await verifyRazorpay(razorpay_order_id);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(PAYMENTSTRIPE, authenticateJwtToken, async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const { origin } = req.headers;
    const result = await paymentStripe(appointmentId, origin);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});
userRouter.post(VERIFYSTRIPE, authenticateJwtToken, async (req, res, next) => {
  try {
    const { appointmentId, success } = req.body;
    const result = await verifyStripe(appointmentId, success);
    res.status(200).json(new responseHandler(result));
  } catch (error) {
    next(error);
  }
});

export default userRouter;
