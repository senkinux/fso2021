const commentRouter = require("express").Router()
const Comment = require("../models/comment")
const Blog = require("../models/blog")

commentRouter.get("/:id/comments", async (req, res) => {
  const { id } = req.params
  const comments = await Blog.findById(id).populate("comments")
  res.json(comments)
})

commentRouter.post("/:id/comments", async (req, res) => {
  const id = req.params.id
  const { body } = req
  const blog = await Blog.findById(id)
  const comment = new Comment({
    content: body.content,
  })

  const savedComment = await comment.save()
  blog.comments = [...blog.comments, savedComment._id]
  await blog.save()
  res.status(201).json(savedComment)
})

module.exports = commentRouter
