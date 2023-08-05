const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema(
	{
		_id: {
			type: mongoose.Types.ObjectId,
			default: mongoose.Types.ObjectId,
		},
		name: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "doctor"],
			default: "user",
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields automatically
	}
);

// static signup method
UserSchema.statics.signup = async function (name, email, password, role) {
	//validation
	if (!name || !email || !password || !role) {
		throw Error("All fields must be filled");
	}
	if (!validator.isEmail(email)) {
		throw Error("Email not valid");
	}

	const exists = await this.findOne({ email });
	if (exists) {
		throw Error("Email already in use");
	}

	const validRoles = ["user", "doctor"];
	if (!validRoles.includes(role)) {
		throw Error('Invalid role. Role must be either "user" or "doctor".');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ name, email, password: hash, role });

	return user;
};

//static login method
UserSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled");
	}

	const user = await this.findOne({ email });

	if (!user) {
		throw Error("Email incorrect");
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error("Incorrect password");
	}

	return user;
};

module.exports = mongoose.model("User", UserSchema);
