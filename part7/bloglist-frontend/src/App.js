import React, { useState, useEffect } from "react"
import Login from "./components/Login"
import Message from "./components/Message"
import Users from "./components/Users"
import ShowBlogForm from "./components/ShowBlogForm"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import User from "./components/User"
import Menu from "./components/Menu"
import { useSelector, useDispatch } from "react-redux"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { initializeBlogs, addNewBlog, likeBlog } from "./reducers/blogsReducer"
import { getUser } from "./reducers/userReducer"
import { getUserlist } from "./reducers/userlistReducer"

const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.user)
  const userlist = useSelector(state => state.userlist)

  const matchUser = useRouteMatch("/api/users/:id")
  const user = matchUser
    ? userlist.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch("/api/blogs/:id")
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUser())
    dispatch(getUserlist())
  }, [dispatch])

  const likeHandler = blog => {
    dispatch(likeBlog(blog))
  }

  const createBlog = blog => {
    dispatch(addNewBlog(blog))
  }

  return (
    <div>
      <Menu loggedInUser={loggedInUser} dispatch={dispatch} />

      {notification.message ? (
        <Message
          message={notification.message}
          success={notification.success}
        />
      ) : null}
      {loggedInUser ? (
        <div>
          <Switch>
            <Route path="/api/users/:id">
              <User user={user} />
            </Route>
            <Route path="/api/users">
              <Users userlist={userlist} />
            </Route>
            <Route path="/api/blogs/:id">
              <Blog blog={blog} likeHandler={likeHandler} />
            </Route>
            <Route path="/api/blogs">
              <ShowBlogForm
                setBlogFormVisible={setBlogFormVisible}
                blogFormVisible={blogFormVisible}
                createBlog={createBlog}
              />
              <BlogList blogs={blogs} />
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
