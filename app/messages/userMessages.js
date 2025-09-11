import { messageHandler } from "../../common/MessageHandler.js";
import {
  errorMessages,
  successMessages,
} from "../../constants/responseMessage.constants.js";
import {
  errorStatusCodes,
  successStatusCodes,
} from "../../constants/responseStatus.constants.js";

const { conflict, unauthorized, notFound } = errorStatusCodes;
const {
  conflictMessage,
  unauthorizedMessage,
  notFoundMessage,
  resourceNotAvailable,
  forbiddenMessage,
} = errorMessages;
const { created, ok } = successStatusCodes;
const {
  createdMessage,
  updatedMessage,
  resourceCreatedSucessfully,
  resourceCanceledSuccessfully,
} = successMessages;

export const userMessages = {
  USERPRESENT: new messageHandler(conflict, conflictMessage),
  SIGNUPSUCCESS: new messageHandler(created, createdMessage),
  UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage),
  LOGINFAILURE: new messageHandler(notFound, notFoundMessage),
  USERUPDATEDSUCCESS: new messageHandler(ok, updatedMessage),
  SLOTNOTAVAILABLE: new messageHandler(conflict, resourceNotAvailable("Slot")),
  DOCTORNOTAVAILABLE: new messageHandler(
    conflict,
    resourceNotAvailable("Doctor")
  ),
  APPOINTMENTBOOKED: new messageHandler(
    ok,
    resourceCreatedSucessfully("Appointment")
  ),
  NOTAUTHENTICATED: new messageHandler(unauthorized, forbiddenMessage),
  APPOINTMENTCANCELLED: new messageHandler(
    ok,
    resourceCanceledSuccessfully("Appointment")
  ),
};
