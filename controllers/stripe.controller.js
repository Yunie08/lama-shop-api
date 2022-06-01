const stripe = require("stripe")(process.env.STRIPE_KEY);
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.processPayment = catchAsync(async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        throw stripeErr;
      } else {
        res.status(200).json({ status: "success", data: { stripeRes } });
      }
    }
  );
});
