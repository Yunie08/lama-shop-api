class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call parent (Error) constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Get stack trace without constructor function call
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
