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
    default:
      return state
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
