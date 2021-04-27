import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { loginUser } from "../reducers/userReducer"
import { showErrorMessage, hideMessage } from "../reducers/notificationReducer"

const Login = ({ dispatch }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const userData = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(userData))
      blogService.setToken(userData.token)
      dispatch(loginUser(userData))
      setUsername("")
      setPassword("")
    } catch (error) {
      dispatch(showErrorMessage("incorrect username or password"))
      setTimeout(() => {
        dispatch(hideMessage())
      }, 2500)
    }
  }
  return (
    <div>
      <h2>login into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label></label>
          username{" "}
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
