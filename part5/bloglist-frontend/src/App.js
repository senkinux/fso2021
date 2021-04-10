import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
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
			const parsedUser = JSON.parse(loggedUser)
			setUser(parsedUser)
			blogService.setToken(parsedUser.token)
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
					<p>{`${user.username} is logged in `}</p>
					<BlogForm setBlogs={setBlogs} blogs={blogs} />
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
