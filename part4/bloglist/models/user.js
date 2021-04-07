const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const usersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
		unique: true,
	},
	name: String,
	passwordHash: {
		type: String,
		required: true,
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
})

usersSchema.plugin(uniqueValidator)

usersSchema.set("toJSON", {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
		delete obj.passwordHash
	},
})

const User = new mongoose.model("User", usersSchema)

module.exports = User
