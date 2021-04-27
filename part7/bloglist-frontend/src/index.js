import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
