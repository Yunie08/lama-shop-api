const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const adminAccess = require("../middleware/adminAccess");

const {
  createProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router
  .route("/")
  .post(authentication, adminAccess, createProduct)
  .get(getAllProducts);

router
  .route("/:productId")
  .put(authentication, adminAccess, updateProduct)
  .get(getOneProduct)
  .delete(authentication, adminAccess, deleteProduct);

module.exports = router;
