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
  appointmentCompletedDoctorList,
  getRoomId,
  getMessagesForRoom,
} from "../controllers/userController.js";
import upload from "../../middleware/multer.js";
import { authenticateJwtToken } from "../../middleware/authUser.js";
import { userRoutesConstants } from "../../constants/routes.constants.js";
import { responseHandler } from "../../common/MessageHandler.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { KEYWORDS } from "../../constants/keywords.constants.js";
const userRouter = express.Router();
const {USER} = KEYWORDS

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
  APPOINTMENTCOMPLETEDDOCTOR,
  GETROOMID,
  GETROOMMESSAGES,
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

userRouter.get(
  GETPROFILE,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const user = await getProfile(userId);
      res.status(200).json(new responseHandler(user));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  UPDATEPROFILE,
  upload.single("image"),
  authenticateJwtToken,
  authorizeRole(USER),
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
  authorizeRole(USER),
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

userRouter.get(
  APPOINTMENTS,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const appointments = await listAppointment(userId);
      res.status(200).json(new responseHandler(appointments));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  CANCELAPPOINTMENT,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const { userId } = res?.locals;
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
  authorizeRole(USER),
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
  authorizeRole(USER),
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
userRouter.post(
  PAYMENTSTRIPE,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { appointmentId } = req.body;
      const { origin } = req.headers;
      const result = await paymentStripe(appointmentId, origin);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(
  VERIFYSTRIPE,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { appointmentId, success } = req.body;
      const result = await verifyStripe(appointmentId, success);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  APPOINTMENTCOMPLETEDDOCTOR,
  authenticateJwtToken,
  authorizeRole(USER),
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const result = await appointmentCompletedDoctorList(userId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  GETROOMID,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const { receiverId } = req?.params;
      const result = await getRoomId(userId, receiverId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  GETROOMMESSAGES,
  authenticateJwtToken,
  async (req, res, next) => {
    try {
      const { userId } = res?.locals;
      const { receiverId } = req?.params;
      const result = await getMessagesForRoom(userId, receiverId);
      res.status(200).json(new responseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
