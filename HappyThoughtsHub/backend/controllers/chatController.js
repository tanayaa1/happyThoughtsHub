const Chat = require('../models/chatModel')
const mongoose = require('mongoose')

// get all 
const getChats = async (req, res) => {
  const chats = await Chat.find({}).sort({createdAt: -1})

  res.status(200).json(chats)
}

// get a single
const getChat = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const chat = await Chat.findById(id)

  if (!chat) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(chat)
}

// create a newt
const createChat = async (req, res) => {
  const {title, text} = req.body

  // add to the database
  try {
    const chat = await Chat.create({ title, text })
    res.status(200).json(chat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a 
const deleteChat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such chat'})
    }
  
    const chat = await Chat.findOneAndDelete({_id: id})
  
    if(!chat) {
      return res.status(400).json({error: 'No such chat'})
    }
  
    res.status(200).json(chat)
}

// update a 
const updateChat = async (req, res) => {

}

module.exports = {
  getChats,
  getChat,
  createChat,
  deleteChat,
  updateChat
}