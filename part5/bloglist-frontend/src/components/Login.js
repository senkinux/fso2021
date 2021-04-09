import React, { useState } from "react"
import loginService from "../services/login"

const Login = ({ setUser }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async e => {
		e.preventDefault()

		try {
			const userData = await loginService.login({ username, password })
			setUser(userData)
			setUsername("")
			setPassword("")
		} catch (error) {
			console.log(error)
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
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					password{" "}
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default Login
