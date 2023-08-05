const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
	// verify user is authenticated
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).json({ error: "Authorization token required" });
		}

		const token = authorization.split(" ")[1];
		// console.log(authorization);

		try {
			const { _id } = jwt.verify(token, "sjfkajdlk");
			// console.log(authorization)
			// console.log("hi in middleware")

			req.user = await User.findOne({ _id }).select("_id");
			next();
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: "Request is not authorized" });
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = requireAuth;
