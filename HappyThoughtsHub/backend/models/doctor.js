const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		address: {
			type: String,
			// required: true,
		},
		speciality: {
			type: String,
			// required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
