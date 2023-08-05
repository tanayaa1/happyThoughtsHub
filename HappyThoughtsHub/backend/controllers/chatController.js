const Chat = require('../models/chatModel')
const User = require('../models/user')
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
  const {name, title, text} = req.body

  // add to the database
  try {
    const chat = await Chat.create({name, title, text })
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

const putLike = async (req, res) => {
  const chatId= req.params.chatId;
  console.log(chatId)
 // const  userId  = req.user._id;
 
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
 
    // Check if the user has already liked the chat
    // if (chat.likes.includes(userId)) {
    //   return res.status(400).json({ error: 'You have already liked this chat' });
    // }

    // Add the user's ObjectID to the likes array
    chat.likes.push(chatId);
    chat.likes_count = chat.likes.length;

    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  console.log("successs liked")
};

const putReport = async (req, res) => {
  const chatId= req.params.chatId;
  console.log(chatId)
 // const  userId  = req.user._id;
 
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
 
    // Check if the user has already liked the chat
    // if (chat.likes.includes(userId)) {
    //   return res.status(400).json({ error: 'You have already liked this chat' });
    // }

    // Add the user's ObjectID to the likes array
    chat.reports.push(chatId);
    chat.reports_count = chat.reports.length;

    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  console.log("successs reported")
};


module.exports = {
  getChats,
  getChat,
  createChat,
  deleteChat,
  updateChat,putLike,putReport
}