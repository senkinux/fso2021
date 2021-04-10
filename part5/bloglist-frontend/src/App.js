import React, { useState, useEffect } from "react"
import "./index.css"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Message from "./components/Message"
import ShowBlogForm from "./components/ShowBlogForm"
import blogService from "./services/blogs"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState("")
	const [error, setError] = useState(false)
	const [blogFormVisible, setBlogFormVisible] = useState(false)

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
			{message && !error ? (
				<Message message={message} className="success" />
			) : null}
			{message && error ? (
				<Message message={message} className="error" />
			) : null}
			{user ? (
				<div>
					<h2>blogs</h2>
					{`${user.username} is logged in `}
					<button onClick={logoutHandler}>logout</button>
					<ShowBlogForm
						setBlogs={setBlogs}
						blogs={blogs}
						setMessage={setMessage}
						setError={setError}
						setBlogFormVisible={setBlogFormVisible}
						blogFormVisible={blogFormVisible}
					/>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} setBlogs={setBlogs} list={blogs} />
					))}
				</div>
			) : (
				<Login setUser={setUser} setMessage={setMessage} setError={setError} />
			)}
		</div>
	)
}

export default App
