import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Message from "./components/Message"
import ShowBlogForm from "./components/ShowBlogForm"
import { useSelector, useDispatch } from "react-redux"
import {
  initializeBlogs,
  addNewBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsReducer"
import { getUser, logoutUser } from "./reducers/userReducer"

const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    getUser()
  }, [])

  const logoutHandler = () => {
    dispatch(logoutUser())
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
        <Login dispatch={dispatch} />
      )}
    </div>
  )
}

export default App
