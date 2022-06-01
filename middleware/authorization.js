const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Cart = require("../models/Cart");
const Order = require("../models/Order");

module.exports = (req, res, next) => {
  const { userId, isAdmin } = req.auth;
  let isOwner = false;

  if (req.params.cartId) {
    const cart = Cart.findById(req.params.cartId);
    isOwner = cart.userId === userId && true;
  } else if (req.params.orderId) {
    const order = Order.findById(req.params.orderId);
    isOwner = order.userId === userId && true;
  } else if (req.body.userId === userId) {
    isOwner = true;
  }

  if (isOwner || isAdmin) {
    return next();
  }

  return next(new AppError("Unauthorized request", 403));
};
