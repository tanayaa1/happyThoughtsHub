const express = require("express");
const router = express.Router();
// const User = require("../models/user");

//controller functions
const { signupUser, loginUser } = require("../controllers/authController");

// router.get("/", () => {
// 	try {
// 		const user = User.signup("example@example.com", "password123", "user");
// 		console.log("User created:", user);
// 	} catch (error) {
// 		console.error("Error creating user:", error.message);
// 	}
// });

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

module.exports = router;
