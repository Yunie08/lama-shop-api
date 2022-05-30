const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
  const { isAdmin } = req.auth;
  if (isAdmin) {
    return next();
  }
  return next(new AppError("Unauthorized request", 403));
};
