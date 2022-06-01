const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = catchAsync(async (req, res, next) => {
  const createdOrder = await Order.create(req.body);

  res.status(201).json({ status: "success", data: { order: createdOrder } });
});

// GET ALL ORDER
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({ status: "success", data: { orders } });
});

// GET USER ORDER
exports.getUserOrder = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const orders = await Order.findOne({ userId });

  res.status(200).json({
    status: "success",
    data: orders,
  });
});

// UPDATE ORDER
exports.updateOrder = catchAsync(async (req, res, next) => {
  let updatedData = req.body;

  const order = await Order.findByIdAndUpdate(req.params.orderId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError("No order found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// DELETE ORDER
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    return next(new AppError("This order does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// GET MONTHLY INCOME
//TODO: Finish!
exports.getMonthlyIncome = catchAsync(async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth - 1));
  const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: { income },
  });
});
