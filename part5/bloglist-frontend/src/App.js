import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	return (
		<div>
			{user ? (
				<div>
					<h2>blogs</h2>
					<p>{`${user.username} is logged in`}</p>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			) : (
				<Login setUser={setUser} />
			)}
		</div>
	)
}

export default App
