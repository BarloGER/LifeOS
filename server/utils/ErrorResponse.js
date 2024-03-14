export class ErrorResponse extends Error {
  constructor({ message, statusCode, statusMessage, errorType, errorCode }) {
    super(message);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}

/*
message = Human readable error message as String: "Wrong password"
statusCode = Http status code as Number: 401
statusMessage = Http status message as String: "Unauthorized"
errorType = errorType: Type of the error indicating the error category as String: "AuthenticationError"
errorCode = Format <CONTEXT>_<TYPE>_<NUMBER> as String: "AUTH_LOGIN_001"
*/
