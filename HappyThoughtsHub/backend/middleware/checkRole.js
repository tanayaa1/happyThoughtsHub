// Middleware to check if the user is a doctor or a user
function checkRole(role) {
	return (req, res, next) => {
		const userRole = req.user.role; // Assuming you have already authenticated the user and set it in the request object (e.g., req.user)

		if (userRole === role) {
			// User has the required role, continue to the next middleware/controller
			next();
		} else {
			// User does not have the required role, send a forbidden response
			res.status(403).json({ message: "Forbidden: Access denied" });
		}
	};
}
