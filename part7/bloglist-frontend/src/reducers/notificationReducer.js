const initialState = { message: "", success: null }

export const showMessage = message => {
  return {
    type: "SET_MESSAGE",
    payload: { message },
  }
}

export const showErrorMessage = message => {
  return {
    type: "SET_ERROR_MESSAGE",
    payload: { message },
  }
}

export const hideMessage = message => {
  return {
    type: "HIDE_MESSAGE",
    payload: { message },
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        success: true,
        message: action.payload.message,
      }
    case "SET_ERROR_MESSAGE":
      return {
        message: action.payload.message,
        success: false,
      }
    case "HIDE_MESSAGE":
      return {
        message: action.payload.message,
        success: null,
      }
    default:
      return state
  }
}

export default notificationReducer
