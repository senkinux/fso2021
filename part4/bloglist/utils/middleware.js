const errorHandler = (err, req, res, next) => {
	if ((err.name = "ValidationError")) {
		return res.status(400).send({
			error: "username and password are required and username must be unique",
		})
	}
	next()
}

module.exports = { errorHandler }
