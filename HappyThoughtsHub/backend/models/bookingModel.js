const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	dRId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
