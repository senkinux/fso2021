const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
})

blogSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  },
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
