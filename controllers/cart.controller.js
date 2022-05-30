const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Cart = require("../models/Cart");

// CREATE CART
exports.createCart = catchAsync(async (req, res, next) => {
  const createdCart = await Cart.create(req.body);

  res.status(201).json({ status: "success", data: { cart: createdCart } });
});

// GET ALL CARTS
exports.getAllCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();

  res.status(200).json({ status: "success", data: { carts } });
});

// GET USER CART
exports.getUserCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId });

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// UPDATE CART
exports.updateCart = catchAsync(async (req, res, next) => {
  let updatedData = req.body;

  const cart = await Cart.findByIdAndUpdate(req.params.cartId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!cart) {
    return next(new AppError("No cart found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

// DELETE CART
exports.deleteCart = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;

  const deletedCart = await Cart.findByIdAndDelete(cartId);

  if (!deletedCart) {
    return next(new AppError("This cart does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
