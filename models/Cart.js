const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

cartSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Cart", cartSchema);
