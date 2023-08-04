const express = require('express')
const {
  getChats,
  getChat,
  createChat,
  deleteChat,
  updateChat,putLike,putReport
} = require('../controllers/chatController')
const router = express.Router()

const requireAuth = require("../middleware/requireAuth");

// GET all 
router.use(requireAuth);
router.get('/', getChats)

// GET a single 
router.get('/:id', getChat)

// POST a new 
router.post('/', createChat)

// DELETE a 
router.delete('/:id', deleteChat)

// UPDATE a 
router.patch('/:id', updateChat)

router.post('/like/:id',putLike)
router.put('/report/:id',putReport)


module.exports = router