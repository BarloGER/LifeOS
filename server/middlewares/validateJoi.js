import { ErrorResponse } from "../utils/ErrorResponse.js";

export const validateJoi = (schema) => (req, res, next) => {
  const dataToValidate = {
    params: req.params,
    body: req.body,
  };

  const { error } = schema.validate(dataToValidate);
  return error
    ? next(
        new ErrorResponse({
          message: error.details[0].message,
          statusCode: 400,
          errorType: "Validation Error",
          errorCode: "Joi_002",
        }),
      )
    : next();
};
