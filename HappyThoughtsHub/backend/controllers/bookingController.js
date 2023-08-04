const Booking = require('../models/bookingModel')
const User = require('../models/user')
const mongoose = require('mongoose')

const getBookings = async (req, res) => {
    const bookings = await Booking.find({}).sort({createdAt: -1})
  
    res.status(200).json(bookings)
  }

// get a single
const getBooking = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such booking'})
    }
  
    const booking = await Booking.findById(id)
  
    if (!booking) {
      return res.status(404).json({error: 'No such booking'})
    }
  
    res.status(200).json(booking)
  }
  
  // create a newt
  const createBooking = async (req, res) => {
    const { userId, date, time } = req.body;
  
    // Access the authenticated user's ID from the middleware
    const authenticatedUserId = req.user._id;
  
    // Check if the provided userId matches the authenticated user's ID
    if (userId !== authenticatedUserId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    // Rest of the code for creating the booking
    try {
      const booking = await Booking.create({ userId, date, time });
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  module.exports = {
    getBookings,
    getBooking,
    createBooking,
    
  }
  