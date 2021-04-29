import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { loginUser } from "../reducers/userReducer"
import { showErrorMessage, hideMessage } from "../reducers/notificationReducer"
import { Form, Button } from "react-bootstrap"

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Form.Label>password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="success"
            className="mt-2"
            type="submit"
            id="login-btn"
          >
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
