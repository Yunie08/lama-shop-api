const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    color: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Product", productSchema);
