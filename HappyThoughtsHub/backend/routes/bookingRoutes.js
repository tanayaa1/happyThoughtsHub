const express = require('express')
const {
  getBookings,getBooking,createBooking
} = require('../controllers/bookingController')
const router = express.Router()

const requireAuth = require("../middleware/requireAuth");

// GET all 
router.use(requireAuth);
router.get('/', getBookings)

// GET a single 
router.get('/:id', getBooking)

// POST a new 
router.post('/', createBooking)



module.exports = router