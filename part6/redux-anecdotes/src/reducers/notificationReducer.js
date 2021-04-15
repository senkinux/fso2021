const initialState = "Dummy text"

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload
    default:
      return state
  }
}

export default notificationReducer
