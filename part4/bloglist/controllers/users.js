const usersRouter = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/user")

usersRouter.post("/", async (req, res) => {
	const { body } = req
	const salt = 10
	const passwordHash = await bcrypt.hash(body.password, salt)

	const user = new User({
		name: body.name,
		username: body.username,
		passwordHash,
	})

	const savedUser = await user.save()
	res.json(savedUser)
})

usersRouter.get("/", async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

module.exports = usersRouter
