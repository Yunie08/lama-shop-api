const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("../models/User");

// REGISTER
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, isAdmin } = req.body;

  const hash = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create({
    username: username,
    email: email,
    password: hash,
    isAdmin: isAdmin,
  });
  const savedUser = await newUser.save();

  res.status(201).json({
    status: "success",
    data: {
      user: savedUser,
    },
  });
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  // Check if username and password are provided
  if (!req.body.username || !req.body.password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );
  // Check if user exists and if passwords match
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  // user._doc otherwise complex object returned by MongoDB
  const { password, ...safeUserData } = user._doc;

  // Create and send authentication token
  res.status(200).json({
    status: "success",
    token: jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    ),
    data: {
      user: safeUserData,
    },
  });
});
