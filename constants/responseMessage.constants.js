export const errorMessages = {
  badRequestMessage: "Bad request. Please check your request and try again.",
  unauthorizedMessage: "Provide valid credentials.",
  forbiddenMessage: "You don't have permission to access this resource.",
  notFoundMessage: "user not found.",
  resourceNotFound: (resource) => `${resource} not found.`,
  conflictMessage:
    "This user already exists or there is a conflict with existing data.",
  resourceExistsMessage: "This resource already exists",
  resourceNotFoundMessage: "This resource not found",
  unauthenticatedJwtToken:
    "you are not authenticated to use please enter jwt token",
  jwtInvalid: "jwt token is invalid",
  internalErrorMessage: "Internal server error",
  resourceNotAvailable: (resource) => `${resource} is not available.`,
};

export const successMessages = {
  resourceCreatedSucessfully: (resource) => `${resource} created successfully.`,
  resourceUpdatedSuccessfully: (resource) =>
    `${resource} updated successfully.`,
  resourceCanceledSuccessfully: (resource) =>
    `${resource} canceled successfully.`,
  createdMessage: "Resource created successfully.",
  updatedMessage: "Resource updated successfully.",
  deletedMessage: "Resource deleted successfully.",
  userAddedToApplication: "User added to application",
  userLoggedInSuccessfully: "User logged in successfully.",
};
