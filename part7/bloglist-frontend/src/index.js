import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import notificationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
  notification: notificationReducer,
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
