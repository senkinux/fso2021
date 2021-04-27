import React, { useState, useEffect } from "react"
import Login from "./components/Login"
import Message from "./components/Message"
import Users from "./components/Users"
import ShowBlogForm from "./components/ShowBlogForm"
import BlogList from "./components/BlogList"
import { useSelector, useDispatch } from "react-redux"
import { Link, Route, Switch } from "react-router-dom"
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
    dispatch(getUser())
  }, [dispatch])

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
          <Switch>
            <Route path="/api/users">
              <Users />
            </Route>
            <Route path="/api/blogs">
              <ShowBlogForm
                setBlogFormVisible={setBlogFormVisible}
                blogFormVisible={blogFormVisible}
                createBlog={createBlog}
              />
              <BlogList
                blogs={blogs}
                deleteHandler={deleteHandler}
                likeHandler={likeHandler}
              />
            </Route>
          </Switch>
        </div>
      ) : (
        <Login dispatch={dispatch} />
      )}
    </div>
  )
}

export default App
