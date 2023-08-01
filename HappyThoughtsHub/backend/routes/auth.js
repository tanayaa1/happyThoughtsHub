const express = require("express");
const router = express.Router();
// const User = require("../models/user");

//controller functions
const { signupUser, loginUser } = require("../controllers/authController");

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

module.exports = router;
