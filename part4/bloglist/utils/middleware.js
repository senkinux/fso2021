const jwt = require("jsonwebtoken")
const User = require("../models/user")

const errorHandler = (err, req, res, next) => {
	console.log(err)
	if ((err.name = "ValidationError")) {
		return res.status(400).send({
			error: "username and password are required and username must be unique",
		})
	}
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get("authorization")
	if (auth && auth.toLowerCase().startsWith("bearer")) {
		req.token = auth.substring(7)
	}
	next()
}

const userExtractor = async (req, res, next) => {
	if (req.token) {
		const decodedToken = jwt.verify(req.token, process.env.SECRET)
		req.user = await User.findById(decodedToken.id)
	}
	next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
