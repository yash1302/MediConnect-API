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
const { unauthorizedMessage, conflictMessage } = errorMessages;
const { created, ok } = successStatusCodes;
const {
  createdMessage,
  resourceCreatedSucessfully,
  resourceCanceledSuccessfully,
} = successMessages;

export const adminMessages = {
  UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage),
  ALREADYEXISTS: new messageHandler(conflict, conflictMessage),
  DOCTORCREATEDSUCCESS: new messageHandler(
    ok,
    resourceCreatedSucessfully("Doctor")
  ),
  APPOINTMENTCANCELLEDSUCESS: new messageHandler(
    ok,
    resourceCanceledSuccessfully("Appointment")
  ),
};
