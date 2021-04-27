import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Message from "./components/Message"
import ShowBlogForm from "./components/ShowBlogForm"
import blogService from "./services/blogs"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs, addNewBlog } from "./reducers/blogsReducer"

const App = () => {
  const [hookBlogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    const likedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    }

    const response = await blogService.update(blog.id, likedBlog)
    const updatedBlogIdx = blogs.findIndex(b => b.id === response.id)
    const listCopy = [...blogs]
    listCopy[updatedBlogIdx] = response
    setBlogs(listCopy)
  }

  const createBlog = blog => {
    dispatch(addNewBlog(blog))
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
