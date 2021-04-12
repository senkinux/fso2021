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

	const likeHandler = async blog => {
		const newBlog = {
			author: blog.author,
			likes: blog.likes + 1,
			title: blog.title,
			url: blog.url,
			user: blog.user.id,
		}

		const response = await blogService.update(blog.id, newBlog)
		const updatedBlogIdx = blogs.findIndex(b => b.id === response.id)
		const listCopy = [...blogs]
		listCopy[updatedBlogIdx] = response
		setBlogs(listCopy)
	}

	const deleteHandler = async blog => {
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
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map(blog => (
							<Blog
								key={blog.id}
								blog={blog}
								deleteHandler={() => deleteHandler(blog)}
								likeHandler={() => likeHandler(blog)}
							/>
						))}
				</div>
			) : (
				<Login setUser={setUser} setMessage={setMessage} setError={setError} />
			)}
		</div>
	)
}

export default App
