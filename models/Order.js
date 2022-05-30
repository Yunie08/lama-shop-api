const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

orderSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Order", orderSchema);
