const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();

// Routers
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.routes");
const orderRoute = require("./routes/order.route");
const stripeRoute = require("./routes/stripe.route");

// Utils
const AppError = require("./utils/appError");

// Connection to database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c5thz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connection successful ✅ !"))
  .catch(() => console.log("Database connection failed 💥 !"));

app.use(express.json());

// API safety
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(mongoSanitize());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Error hanlding
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// Main export
module.exports = app;
