const express = require("express");
const router = express.Router();
const {
	getDoctor,
	createDoctor,
	editDoctor,
} = require("../controllers/doctorController");

const requireAuth = require("../middleware/requireAuth");


router.use(requireAuth);
router.get("/:id", getDoctor);

// GET a single
router.post("/:id", createDoctor);

// POST a new
router.put("/:id", editDoctor);


module.exports = router;
