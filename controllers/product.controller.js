const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = catchAsync(async (req, res, next) => {
  const createdProduct = await Product.create(req.body);

  res
    .status(201)
    .json({ status: "success", data: { product: createdProduct } });
});

// GET ALL Products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  let products;

  if (queryNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
  } else if (queryCategory) {
    products = await Product.find({ categories: { $in: [queryCategory] } });
  } else {
    products = await Product.find();
  }

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

// GET PRODUCT
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("This product does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

// UPDATE PRODUCT
exports.updateProduct = catchAsync(async (req, res, next) => {
  let updatedData = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new AppError("No product found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// DELETE PRODUCT
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return next(new AppError("This product does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
