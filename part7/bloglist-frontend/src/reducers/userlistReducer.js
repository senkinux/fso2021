import { getUsers } from "../services/users"

const userlistReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload
    default:
      return state
  }
}

export const getUserlist = () => async dispatch => {
  const userlist = await getUsers()
  dispatch({
    type: "GET_USERS",
    payload: userlist,
  })
}

export default userlistReducer
