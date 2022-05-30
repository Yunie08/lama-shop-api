const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new AppError("Unauthenticated request", 401));
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const { userId, isAdmin } = decodedToken;

  req.auth = { userId, isAdmin };
  next();
});
