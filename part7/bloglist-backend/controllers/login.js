const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
	const { body } = req

	const user = await User.findOne({ username: body.username })
	const isPwdCorrect = !user
		? false
		: bcrypt.compare(body.password, user.passwordHash)

	if (!(user && isPwdCorrect)) {
		return res.status(401).json({ error: "invalid username or password" })
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userForToken, process.env.SECRET)

	res.json({ token, ...userForToken })
})

module.exports = loginRouter
