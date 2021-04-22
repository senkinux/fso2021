import React from "react"
import BlogForm from "./BlogForm"

const ShowBlogForm = ({ setBlogFormVisible, blogFormVisible, createBlog }) => {
	const hideWhenVisible = { display: blogFormVisible ? "none" : "" }
	const showWhenVisible = { display: blogFormVisible ? "" : "none" }

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => setBlogFormVisible(!blogFormVisible)}>
					New Blog
				</button>
			</div>
			<div style={showWhenVisible}>
				<BlogForm createBlog={createBlog} />
				<button onClick={() => setBlogFormVisible(!blogFormVisible)}>
					cancel
				</button>
			</div>
		</div>
	)
}

export default ShowBlogForm
