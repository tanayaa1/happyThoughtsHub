const Booking = require("../models/bookingModel");
const User = require("../models/user");
const mongoose = require("mongoose");

const getBookings = async (req, res) => {
	const bookings = await Booking.find({}).sort({ createdAt: -1 });

	res.status(200).json(bookings);
};

// get a single
const getBooking = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such booking" });
	}

	const booking = await Booking.findById(id);

	if (!booking) {
		return res.status(404).json({ error: "No such booking" });
	}

	res.status(200).json(booking);
};

const getBookingsForDoctor = async (req, res) => {
	const { dRId } = req.params;

	try {
		// Find all bookings with the given Doctor ID
		const bookings = await Booking.find({ dRId: dRId }).populate(
			"userId",
			"name email"
		);
		console.log(bookings);

		if (bookings.length === 0) {
			// Return a message if there are no bookings for the doctor
			return res
				.status(404)
				.json({ message: "No bookings found for this doctor" });
		}

		// Return the bookings in the response
		res.json(bookings);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching bookings", error: error.message });
	}
};

// create a newt
const createBooking = async (req, res) => {
	const { userId, date, time } = req.body;
	const { id } = req.params;
	try {
		const booking = await Booking.create({ userId, dRId: id, date, time });
		res.status(201).json(booking);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getBookings,
	getBooking,
	createBooking,
	getBookingsForDoctor,
};
