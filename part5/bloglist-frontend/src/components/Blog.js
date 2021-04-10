import React, { useState } from "react"
const Blog = ({ blog }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={() => setBlogVisible(!blogVisible)}>view</button>
			{!blogVisible ? null : (
				<div>
					<div>{blog.url}</div>
					<div>
						likes {blog.likes} <button>like</button>
					</div>
					<div>{blog.author}</div>
				</div>
			)}
		</div>
	)
}
export default Blog
