import React, { useState, useEffect } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
const Blog = ({ blog, setBlogs, list }) => {
	const [blogVisible, setBlogVisible] = useState(false)
	const [canDeleteBlog, setCanDeleteBlog] = useState(null)

	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		setBlogs: PropTypes.func.isRequired,
		list: PropTypes.array.isRequired,
	}

	useEffect(() => {
		const userId = JSON.parse(window.localStorage.getItem("loggedUser"))
		const canUserDeleteBlog = blog.user.id === userId.id
		setCanDeleteBlog(canUserDeleteBlog)
	}, [blog, canDeleteBlog])

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

	const deleteHandler = async () => {
		const confirmation = window.confirm(
			`Are you sure you want to delete ${blog.title} by ${blog.author}`
		)
		if (confirmation) {
			try {
				await blogService.deleteBlog(blog.id)
				const fetchedBlogs = await blogService.getAll()
				setBlogs(fetchedBlogs)
			} catch (error) {
				window.alert("Ooops, something went wrong")
			}
		}
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
					{canDeleteBlog ? (
						<div>
							<button
								style={{ backgroundColor: "red" }}
								onClick={deleteHandler}
							>
								delete
							</button>
						</div>
					) : null}
				</div>
			)}
		</div>
	)
}
export default Blog
