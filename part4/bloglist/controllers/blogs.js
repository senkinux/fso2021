const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
		id: 1,
	})
	res.json(blogs)
})

blogsRouter.get("/:id", async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	res.json(blog)
})

blogsRouter.post("/", async (req, res) => {
	const { body } = req
	if (!body.likes) {
		body.likes = 0
	}

	if (!body.url || !body.title) {
		return res.status(400).end()
	}

	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "token is invalid or missing" })
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog)
	await user.save()
	res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken) {
		return res.status(401).json({ error: "token is invalid or missing" })
	}

	const blog = await Blog.findById(req.params.id)
	if (blog.user.toString() === decodedToken.id.toString()) {
		await Blog.findByIdAndDelete(req.params.id)
		res.status(204).end()
	} else {
		return res
			.status(401)
			.json({ error: "Unauthorized: Only user who created post can delete it" })
	}
})

blogsRouter.put("/:id", async (req, res) => {
	const body = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
		new: true,
	})
	res.json(updatedBlog)
})

module.exports = blogsRouter
