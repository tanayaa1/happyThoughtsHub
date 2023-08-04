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

router.post("/:id", createDoctor);

router.put("/:id", editDoctor);


module.exports = router;
