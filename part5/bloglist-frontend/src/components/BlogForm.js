import React, { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const submitBlog = async e => {
		e.preventDefault()
		console.log({ title, author, url })
		const newBlog = await blogService.create({ title, author, url })
		setBlogs(blogs.concat(newBlog))
		setTitle("")
		setAuthor("")
		setUrl("")
	}

	return (
		<div>
			<form onSubmit={submitBlog}>
				title: <input value={title} onChange={e => setTitle(e.target.value)} />
				<div>
					author:{" "}
					<input value={author} onChange={e => setAuthor(e.target.value)} />
				</div>
				<div>
					url: <input value={url} onChange={e => setUrl(e.target.value)} />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default BlogForm
