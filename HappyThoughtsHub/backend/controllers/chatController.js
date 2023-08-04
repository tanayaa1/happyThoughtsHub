const Chat = require("../models/chatModel");
const User = require("../models/user");
const mongoose = require("mongoose");

// get all
const getChats = async (req, res) => {
	const chats = await Chat.find({}).sort({ createdAt: -1 });

	res.status(200).json(chats);
};

// get a single
const getChat = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" });
	}

	const chat = await Chat.findById(id);

	if (!chat) {
		return res.status(404).json({ error: "No such workout" });
	}

	res.status(200).json(chat);
};

// create a newt
const createChat = async (req, res) => {
	const { name, title, text } = req.body;

	// add to the database
	try {
		const chat = await Chat.create({ name, title, text });
		res.status(200).json(chat);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a
const deleteChat = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such chat" });
	}

	const chat = await Chat.findOneAndDelete({ _id: id });

	if (!chat) {
		return res.status(400).json({ error: "No such chat" });
	}

	res.status(200).json(chat);
};

// update a
const updateChat = async (req, res) => {};

// const putLike = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ error: "You must be logged in to like a post." });
// }

// const chatId = req.body._id;
// const userId = req.user._id;
// Chat.findByIdAndUpdate(chatId, {
//   $push: { likes: req.user._id }
// }, {
//   new: true
// })
// .exec((err, result) => {
//   if (err) {
//       return res.status(422).json({ error: err });
//   } else {
//       res.json(result);
//   }
// });

// 	// const chat = await Chat.findById(chatId);
// 	// if (course.course_likes.includes(userId)) {
// 	// 	console.log("error", "Cannot like more than once!");
// 	// } else {
// 	// 	await Chat.findByIdAndUpdate(chatId, {
// 	// 		$push: {likes: userId},
// 	// 		$inc: { likes_count: 1 },
// 	// 	},{
//   //     new:true
//   // }).exec((err,result)=>{
//   //     if(err){
//   //         return res.status(422).json({error:err})
//   //     }else{
//   //         res.json(result)
//   //     }
//   // }

//   //   )
// };
// 		console.log("success", "Liked!");
// 	//}

const putLike = async (req, res) => {
	const { chatId } = req.params;
	const { userId } = req.body;

	try {
		const chat = await Chat.findById(chatId);

		if (!chat) {
			return res.status(404).json({ error: "Chat not found" });
		}

		// Check if the user has already liked the chat
		if (chat.likes.includes(userId)) {
			return res
				.status(400)
				.json({ error: "You have already liked this chat" });
		}

		// Add the user's ObjectID to the likes array
		chat.likes.push(userId);
		chat.likes_count = chat.likes.length;

		await chat.save();

		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
const putReport = async (req, res) => {
	const chatId = "64c4b530284c3c0b22eceb03";

	const chat = await Chat.findById(chatId);
	// if (course.course_likes.includes(userId)) {
	// 	console.log("error", "Cannot like more than once!");
	// } else {
	await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { reports: "64c4b530284c3c0b22eceb03" },
			$inc: { report_count: 1 },
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
	console.log("success", "Liked!");
	//}
};

module.exports = {
	getChats,
	getChat,
	createChat,
	deleteChat,
	updateChat,
	putLike,
	putReport,
};
