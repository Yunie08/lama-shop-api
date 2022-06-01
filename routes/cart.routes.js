const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const adminAccess = require("../middleware/adminAccess");
const authorization = require("../middleware/authorization");

const {
  createCart,
  getAllCarts,
  updateCart,
  getUserCart,
  deleteCart,
} = require("../controllers/cart.controller");

router
  .route("/")
  .post(authentication, authorization, createCart)
  .get(authentication, adminAccess, getAllCarts);

router
  .route("/:cartId")
  .put(authentication, authorization, updateCart)
  .delete(authentication, authorization, deleteCart);

router.route("/find/:userId", authentication, authorization, getUserCart);

module.exports = router;
