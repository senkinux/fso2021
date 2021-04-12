import React, { useState } from "react"
import PropTypes from "prop-types"
const Blog = ({ blog, deleteHandler, likeHandler }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		deletehandler: PropTypes.func,
		likeHandler: PropTypes.func,
	}

	const canDeleteBlog = JSON.parse(window.localStorage.getItem("loggedUser"))

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle} className="blog_test">
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
