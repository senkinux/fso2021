import React from "react"
import BlogForm from "./BlogForm"

const ShowBlogForm = ({
	setBlogs,
	blogs,
	setMessage,
	setError,
	setBlogFormVisible,
	blogFormVisible,
}) => {
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
				<BlogForm
					setBlogs={setBlogs}
					blogs={blogs}
					setMessage={setMessage}
					setError={setError}
				/>
				<button onClick={() => setBlogFormVisible(!blogFormVisible)}>
					cancel
				</button>
			</div>
		</div>
	)
}

export default ShowBlogForm
