const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const adminAccess = require("../middleware/adminAccess");
const authorization = require("../middleware/authorization");

const {
  getAllOrders,
  createOrder,
  getMonthlyIncome,
  getUserOrder,
  updateOrder,
} = require("../controllers/order.controller");

router
  .route("/")
  .post(authentication, authorization, createOrder)
  .get(authentication, adminAccess, getAllOrders);

router.route("/stats").get(authentication, adminAccess, getMonthlyIncome);

router.route("/find/:userId").get(authentication, authorization, getUserOrder);

router.route("/:orderId").put(authentication, authorization, updateOrder);

module.exports = router;
