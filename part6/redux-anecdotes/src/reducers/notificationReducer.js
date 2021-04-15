const initialState = ""

export const setMessage = message => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  }
}

export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload
    case "REMOVE_MESSAGE":
      return initialState
    default:
      return state
  }
}

export default notificationReducer
