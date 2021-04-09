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

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
		}
	}, [])

	const logoutHandler = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
	}

	return (
		<div>
			{user ? (
				<div>
					<h2>blogs</h2>
					{`${user.username} is logged in `}
					<button onClick={logoutHandler}>logout</button>
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
