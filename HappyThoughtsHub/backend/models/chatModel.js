const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		likes: [{ type: ObjectId }],
		likes_count: { type: Number, default: 0 },
		reports: [{ type: ObjectId }],
		reports_count: { type: Number, default: 0 },
		photo: {
			public_id: {
			  type: String,
			  required: true,
			},
			url: {
			  type: String,
			  required: true,
			},
		  },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);
