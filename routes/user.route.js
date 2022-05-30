const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const adminAccess = require("../middleware/adminAccess");

const {
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
  getUsersStats,
} = require("../controllers/user.controller");

router.route("/").get(authentication, adminAccess, getAllUsers);

router.get("/stats", authentication, adminAccess, getUsersStats);

router
  .route("/:userId")
  .get(authentication, adminAccess, getOneUser)
  .put(authentication, authorization, updateUser)
  .delete(authentication, authorization, deleteUser);

module.exports = router;
