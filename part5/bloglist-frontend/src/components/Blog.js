import React, { useState } from "react"
import blogService from "../services/blogs"
const Blog = ({ blog, setBlogs, list }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const likeHandler = async () => {
		const newBlog = {
			author: blog.author,
			likes: blog.likes + 1,
			title: blog.title,
			url: blog.url,
			user: blog.user.id,
		}

		const response = await blogService.update(blog.id, newBlog)
		const updatedBlogIdx = list.findIndex(b => b.id === response.id)
		const listCopy = [...list]
		listCopy[updatedBlogIdx] = response
		setBlogs(listCopy)
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={() => setBlogVisible(!blogVisible)}>view</button>
			{!blogVisible ? null : (
				<div>
					<div>{blog.url}</div>
					<div>
						likes {blog.likes} <button onClick={likeHandler}>like</button>
					</div>
					<div>{blog.author}</div>
				</div>
			)}
		</div>
	)
}
export default Blog
