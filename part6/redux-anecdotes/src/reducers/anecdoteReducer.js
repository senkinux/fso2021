import service from "../service"
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const addBlog = newBlog => {
  return {
    type: "CREATE_BLOG",
    payload: {
      content: newBlog.content,
      votes: newBlog.votes,
      id: newBlog.id,
    },
  }
}

export const likeBlog = id => {
  return {
    type: "VOTE",
    payload: { id },
  }
}

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await service.getAll()
  dispatch({
    type: "INIT",
    payload: anecdotes,
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(blog =>
        blog.id === action.payload.id
          ? { ...blog, votes: blog.votes + 1 }
          : blog
      )
    case "CREATE_BLOG":
      const newBlog = asObject(action.payload.content)
      const updatedState = [...state, newBlog]
      return updatedState
    case "INIT":
      return action.payload
    default:
      return state
  }
}

export default reducer
