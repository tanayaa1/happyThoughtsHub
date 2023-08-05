const express = require("express");
const {
	getBookings,
	getBooking,
	createBooking,
	getBookingsForDoctor,
} = require("../controllers/bookingController");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

// GET all
//router.use(requireAuth);
router.get("/", getBookings);

// GET a single
router.get("/single/:id", getBooking);
router.get("/doctor/:id", getBookingsForDoctor);

// POST a new
router.post("/:id", createBooking);

module.exports = router;
