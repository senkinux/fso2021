import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Message from "./components/Message"
import ShowBlogForm from "./components/ShowBlogForm"
import blogService from "./services/blogs"
import { useSelector, useDispatch } from "react-redux"
import {
  initializeBlogs,
  addNewBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsReducer"

const App = () => {
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

  const likeHandler = blog => {
    dispatch(likeBlog(blog))
  }

  const createBlog = blog => {
    dispatch(addNewBlog(blog))
  }

  const deleteHandler = blog => {
    dispatch(deleteBlog(blog))
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
