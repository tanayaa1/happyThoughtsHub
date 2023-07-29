const express = require('express')
const {
  getChats,
  getChat,
  createChat,
  deleteChat,
  updateChat
} = require('../controllers/chatController')
const router = express.Router()

// GET all 
router.get('/', getChats)

// GET a single 
router.get('/:id', getChat)

// POST a new 
router.post('/', createChat)

// DELETE a 
router.delete('/:id', deleteChat)

// UPDATE a 
router.patch('/:id', updateChat)


module.exports = router