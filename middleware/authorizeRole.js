import { userMessages } from "../app/messages/userMessages.js";

const { NOTAUTHENTICATED, UNAUTHORIZED } = userMessages;

export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const user = res.locals.role;

    if (!user) {
      res.status(401).json(new responseHandler(null, UNAUTHORIZED));
    }

    if (user !== requiredRole) {
      res.status(403).json(new responseHandler(null, NOTAUTHENTICATED));
    }

    next();
  };
};
