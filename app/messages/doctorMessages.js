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
  resourceUpdatedSuccessfully,
} = successMessages;

export const doctorMessages = {


  UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage),
  LOGINFAILURE: new messageHandler(notFound, notFoundMessage),
  DOCTORUPDATEDSUCCESS: new messageHandler(ok, updatedMessage),
  SLOTNOTAVAILABLE: new messageHandler(conflict, resourceNotAvailable("Slot")),
  DOCTORNOTAVAILABLE: new messageHandler(
    notFound,
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
  APPOINTMENTCOMPLETED: new messageHandler(
    ok,
    resourceUpdatedSuccessfully("Appointment")
  ),
  AVAILABILITYCHANGEDSUCCESSFULLY: new messageHandler(
    ok,
    resourceUpdatedSuccessfully("Availability")
  ),
};
