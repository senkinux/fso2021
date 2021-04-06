const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
})

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
