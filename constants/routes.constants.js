export const routesConstants = {
  USERROUTES: "/api/user",
  ADMINROUTES: "/api/admin",
  DOCTORROUTES: "/api/doctor",
};

export const HEALTHCHECKAPI = "/api/health-check";

export const userRoutesConstants = {
  LOGIN: "/login",
  REGISTER: "/register",
  GETPROFILE: "/get-profile",
  UPDATEPROFILE: "/update-profile",
  BOOKAPPOINTMENT: "/book-appointment",
  APPOINTMENTS: "/appointments",
  CANCELAPPOINTMENT: "/cancel-appointment",
  PAYMENTRAZORPAY: "/payment-razorpay",
  VERIFYRAZORPAY: "/verifyRazorpay",
  PAYMENTSTRIPE: "/payment-stripe",
  VERIFYSTRIPE: "/verifyStripe",
  APPOINTMENTCOMPLETEDDOCTOR: "/appointment-completed-doctors",
  GETROOMID: "/get-room-id/:receiverId",
  GETROOMMESSAGES: "/get-room-messages/:receiverId",
};

export const doctorRoutesConstants = {
  LOGIN: "/login",
  CANCELAPPOINTMENT: "/cancel-appointment",
  APPOINTMENTS: "/appointments",
  DOCTORLIST: "/list",
  CHANGEAVAILABILITY: "/change-availability",
  COMPLETEAPPOINTMENT: "/complete-appointment",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  UPDATEPROFILE: "/update-profile",
};

export const adminRoutesConstants = {
  LOGIN: "/login",
  ADDDOCTOR: "/add-doctor",
  APPOINTMENTS: "/appointments",
  CANCELAPPOINTMENT: "/cancel-appointment",
  ALLDOCTORLIST: "/all-doctors",
  CHANGEAVAILABILITY: "/change-availability",
  DASHBOARD: "/dashboard",
};
