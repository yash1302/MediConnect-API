import jwt from "jsonwebtoken";
import Utils from "../common/utils.js";
import { errorStatusCodes } from "../constants/responseStatus.constants.js";
import { messageHandler, responseHandler } from "../common/MessageHandler.js";
import { errorMessages } from "../constants/responseMessage.constants.js";

const { unauthorized } = errorStatusCodes;
const { unauthenticatedJwtToken, jwtInvalid } = errorMessages;

const { verifyToken } = Utils;

const ENTERJWTTOKEN = new messageHandler(unauthorized, unauthenticatedJwtToken);
const JWTINVALID = new messageHandler(unauthorized, jwtInvalid);

export const authenticateJwtToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(ENTERJWTTOKEN.statusCode)
      .json(new responseHandler(null, ENTERJWTTOKEN));
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res
      .status(ENTERJWTTOKEN.statusCode)
      .json(new responseHandler(null, ENTERJWTTOKEN));
  } else {
    try {
      const result = await verifyToken(token);
      if (!result.success) {
        return res
          .status(JWTINVALID.statusCode)
          .json(new responseHandler(null, JWTINVALID));
      } else {
        res.locals = result.data;
        next();
      }
    } catch (error) {
      throw error;
    }
  }
};
