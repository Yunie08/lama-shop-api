const bcrypt = require("bcrypt");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = req.query.new;
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

// GET USER
exports.getOneUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("This user does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// UPDATE USER
exports.updateUser = catchAsync(async (req, res, next) => {
  let updatedData = req.body;

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  if (updatedData.isAdmin) {
    updatedData.isAdmin = undefined;
  }

  const user = await User.findByIdAndUpdate(req.params.userId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

// DELETE USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return next(new AppError("This user does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// GET USER STATS
// Number of users registered per month in the last past year
exports.getUsersStats = catchAsync(async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    { $project: { month: { $month: "$createdAt" } } },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);

  res.status(200).json({
    status: "success",
    data: { data },
  });
});
