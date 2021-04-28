import blogService from "../services/blogs"
const userReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload
    case "LOGIN_USER":
      return action.payload
    case "LOGOUT_USER":
      return null
    default:
      return state
  }
}

export const getUser = () => async dispatch => {
  const loggedUser = window.localStorage.getItem("loggedUser")
  if (loggedUser) {
    const parsedUser = JSON.parse(loggedUser)
    blogService.setToken(parsedUser.token)
    dispatch({
      type: "GET_USER",
      payload: parsedUser,
    })
  }
}

export const loginUser = userData => async dispatch => {
  dispatch({
    type: "LOGIN_USER",
    payload: userData,
  })
}

export const logoutUser = () => {
  window.localStorage.removeItem("loggedUser")
  return {
    type: "LOGOUT_USER",
  }
}

export default userReducer
