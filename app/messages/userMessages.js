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
const { conflictMessage, unauthorizedMessage, notFoundMessage } = errorMessages;
const { created, ok } = successStatusCodes;
const { createdMessage, updatedMessage } = successMessages;

export const userMessages = {
  USERPRESENT: new messageHandler(conflict, conflictMessage),
  SIGNUPSUCCESS: new messageHandler(created, createdMessage),
  UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage),
  LOGINFAILURE: new messageHandler(notFound, notFoundMessage),
  USERUPDATEDSUCCESS: new messageHandler(ok, updatedMessage),
};
