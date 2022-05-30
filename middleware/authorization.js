const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
  const { userId, isAdmin } = req.auth;

  if (userId === req.params.userId || isAdmin) {
    return next();
  }

  return next(new AppError("Unauthorized request", 403));
};
