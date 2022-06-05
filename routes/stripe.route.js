const express = require("express");
const router = express.Router();

const { processPayment } = require("../controllers/stripe.controller");

router.route("/payment").post(processPayment);

module.exports = router;
