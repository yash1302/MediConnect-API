import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import stripe from "stripe";
import razorpay from "razorpay";
import { userMessages } from "../messages/userMessages.js";
import utils from "../../common/utils.js";
import userService from "../service/userService.js";
import adminService from "../service/adminService.js";


const {
  USERPRESENT,
  SIGNUPSUCCESS,
  LOGINFAILURE,
  UNAUTHORIZED,
  USERUPDATEDSUCCESS,
  SLOTNOTAVAILABLE,
  DOCTORNOTAVAILABLE,
  APPOINTMENTBOOKED,
  NOTAUTHENTICATED,
  APPOINTMENTCANCELLED,
} = userMessages;
const {
  findUserService,
  signupUserService,
  getUserDataService,
  updateProfileService,
  getDoctorDataService,
  getAppointmentsForUserService,
  getAppointmentDetailsService,
  cancelAppointmentService,
  updateSlotsForDoctorService,
  getDictinctDoctorsForUserService,
  getRoomIdForUserService,
} = userService;

const {getAllDoctorsService} = adminService

const { hashPassword, verifyPassword, generateJwtToken, uploadFromBuffer } =
  utils;

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerUser = async (name, email, password) => {
  try {
    const isUserPresent = await findUserService(email);
    if (isUserPresent) {
      throw USERPRESENT;
    }
    const hashedPassword = await hashPassword(password);
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: "user",
    };

    await signupUserService(userData);
    return SIGNUPSUCCESS;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await findUserService(email);
    if (user?._doc?._id) {
      const verfiedPassword = await verifyPassword(
        password,
        user?._doc?.password
      );
      if (verfiedPassword) {
        const tokenData = {
          role: user?._doc?.role,
          email: email,
          userId: user?._doc?._id,
        };
        const token = await generateJwtToken(tokenData);
        return token;
      } else {
        throw UNAUTHORIZED;
      }
    } else {
      throw LOGINFAILURE;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// API to get user profile data
const getProfile = async (userId) => {
  try {
    const userData = await getUserDataService(userId);
    return userData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProfile = async (userId, body, file) => {
  try {
    const { name, phone, address, dob, gender } = body;
    const imageFile = file;

    const userData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };
    await updateProfileService(userId, userData);

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await uploadFromBuffer(imageFile.buffer);
      const imageURL = imageUpload.secure_url;

      await updateProfileService(userId, { image: imageURL });
    }

    return USERUPDATEDSUCCESS;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const bookAppointment = async (userId, docId, slotDate, slotTime) => {
  try {
    const docData = await getDoctorDataService(docId);

    if (!docData.available) {
      throw DOCTORNOTAVAILABLE;
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        throw SLOTNOTAVAILABLE;
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await getUserDataService(userId);

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await updateSlotsForDoctorService(docId, slots_booked);

    return APPOINTMENTBOOKED;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cancelAppointment = async (userId, appointmentId) => {
  try {
    const appointmentData = await getAppointmentDetailsService(appointmentId);

    if (appointmentData.userId !== userId) {
      throw NOTAUTHENTICATED;
    }

    await cancelAppointmentService(appointmentId);

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await getDoctorDataService(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await updateSlotsForDoctorService(docId, slots_booked);

    return APPOINTMENTCANCELLED;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (userId) => {
  try {
    const appointments = await getAppointmentsForUserService(userId);

    return appointments;
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { origin } = req.headers;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    const currency = process.env.CURRENCY.toLocaleLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: "Appointment Fees",
          },
          unit_amount: appointmentData.amount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
      cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
      line_items: line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { appointmentId, success } = req.body;

    if (success === "true") {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
      });
      return res.json({ success: true, message: "Payment Successful" });
    }

    res.json({ success: false, message: "Payment Failed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCompletedDoctorList = async (userId) => {
  try {
    const appointments = await getDictinctDoctorsForUserService(userId);

    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoomId = async (userId, receiverId) => {
  try {
    const roomId = await getRoomIdForUserService(userId, receiverId);
    return roomId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMessagesForRoom = async (userId, receiverId) => {
  try {
    const messages = await userService.getMessagesForRoomService(
      userId,
      receiverId
    );
    return messages;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
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
};
