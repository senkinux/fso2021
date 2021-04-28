import blogService from "../services/blogs"
import {
  showMessage,
  hideMessage,
  showErrorMessage,
} from "./notificationReducer"

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.payload
    case "CREATE_BLOG":
      return [...state, action.payload]
    case "LIKE_BLOG":
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    case "DELETE_BLOG":
      return [...action.payload]
    default:
      return state
  }
}

export const likeBlog = blog => async dispatch => {
  const likedBlog = {
    author: blog.author,
    likes: blog.likes + 1,
    title: blog.title,
    url: blog.url,
    user: blog.user.id,
  }
  const response = await blogService.update(blog.id, likedBlog)
  console.log(response)
  dispatch({ type: "LIKE_BLOG", payload: response })
}

export const deleteBlog = blog => async dispatch => {
  const confirmation = window.confirm(
    `Are you sure you want to delete ${blog.title} by ${blog.author}`
  )
  if (confirmation) {
    try {
      await blogService.deleteBlog(blog.id)
      const fetchedBlogs = await blogService.getAll()
      dispatch({ type: "DELETE_BLOG", payload: fetchedBlogs })
    } catch (error) {
      window.alert("Ooops, something went wrong")
    }
  }
}

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch({
    type: "INIT_BLOGS",
    payload: blogs,
  })
}

export const addNewBlog = blog => async dispatch => {
  try {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "CREATE_BLOG",
      payload: newBlog,
    })
    const message = `${blog.title} by ${blog.author} was created`
    dispatch(showMessage(message))
    setTimeout(() => {
      dispatch(hideMessage())
    }, 2500)
  } catch (error) {
    dispatch(showErrorMessage("Cannot create. Please fill in all fields"))
    setTimeout(() => {
      dispatch(hideMessage(""))
    }, 2500)
  }
}

export default blogsReducer
