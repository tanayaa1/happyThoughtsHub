const express = require("express");
const router = express.Router();
const {
	getDoctor,
	createDoctor,
	editDoctor,
	getDoctors,
} = require("../controllers/doctorController");

function checkRole(role) {
	return (req, res, next) => {
		const userRole = req.user.role;
		if (userRole === role) {
			next();
		} else {
			res.status(403).json({ message: "Forbidden: Access denied" });
		}
	};
}

const requireAuth = require("../middleware/requireAuth");

const checkDoctor = checkRole("doctor");

router.get("/", getDoctors);
router.use(requireAuth);

router.get("/:id", getDoctor);
// router.use(checkDoctor)
router.post("/:id", createDoctor);
router.put("/:id", editDoctor);

module.exports = router;
