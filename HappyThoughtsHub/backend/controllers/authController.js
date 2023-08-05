const Doctor = require("../models/doctor");
const User = require("../models/user");
// const FavoritesCart = require("../models/favoritesCart");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	return jwt.sign({ _id }, "sjfkajdlk", { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		console.log(user.name, email, password, user.role);
		const user_name = user.name;
		const user_role = user.role;
		// create a token
		const token = createToken(user._id);

		res
			.status(200)
			.json({ _id: user._id, name: user_name, email, token, role: user_role });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//signup user
const signupUser = async (req, res) => {
	const { name, email, password, role } = req.body;

	try {
		const user = await User.signup(name, email, password, role);

		// create a token
		const token = createToken(user._id);
		if (role == "doctor") {
			const newDoctor = await Doctor.create({ userId: user._id });
		}

		res.status(200).json({ _id: user._id, name, email, token, role });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { signupUser, loginUser };
