import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Message from "./components/Message"
import ShowBlogForm from "./components/ShowBlogForm"
import blogService from "./services/blogs"
import { useSelector, useDispatch } from "react-redux"
import {
  showMessage,
  showErrorMessage,
  hideMessage,
} from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

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

  const createBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      const message = `${blog.title} by ${blog.author} was created`
      dispatch(showMessage(message))
      setTimeout(() => {
        dispatch(hideMessage())
      }, 2500)
    } catch (error) {
      console.log({ error })
      dispatch(showErrorMessage("Cannot create. Please fill in all fields"))
      setTimeout(() => {
        dispatch(hideMessage(""))
      }, 2500)
    }
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
      {notification.message ? (
        <Message
          message={notification.message}
          success={notification.success}
        />
      ) : null}
      {user ? (
        <div>
          <h2>blogs</h2>
          {`${user.username} is logged in `}
          <button onClick={logoutHandler}>logout</button>
          <ShowBlogForm
            setBlogFormVisible={setBlogFormVisible}
            blogFormVisible={blogFormVisible}
            createBlog={createBlog}
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
        <Login setUser={setUser} />
      )}
    </div>
  )
}

export default App
