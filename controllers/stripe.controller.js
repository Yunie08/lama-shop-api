const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

exports.processPayment = catchAsync(async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return next(new AppError(stripeErr));
      } else {
        res.status(200).json({ status: "success", data: { stripeRes } });
      }
    }
  );
});
