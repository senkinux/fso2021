const initialState = ""

export const setMessage = message => async dispatch => {
  dispatch({
    type: "SET_MESSAGE",
    payload: {
      message,
      delay: setTimeout(() => {
        dispatch(removeMessage())
      }, 5000),
    },
  })
}

export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      clearTimeout(state.delay)
      return action.payload.message
    case "REMOVE_MESSAGE":
      return initialState
    default:
      return state
  }
}

export default notificationReducer
