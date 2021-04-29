import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer"
import { useHistory } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { Button } from "react-bootstrap"

const Menu = ({ loggedInUser, dispatch }) => {
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logoutUser())
    history.push("/")
  }

  if (!loggedInUser) {
    return null
  }

  return (
    <Nav variant="pills">
      <Nav.Item className="m-3">
        <Link to="/api/blogs" className="text-info">
          <b>blogs</b>
        </Link>
      </Nav.Item>
      <Nav.Item className="m-3">
        <Link to="/api/users" className="text-info">
          <b>users</b>
        </Link>
      </Nav.Item>
      <div className="m-3">{`${loggedInUser.username} is logged in `}</div>
      <Button className="ml-4 mt-2" onClick={logoutHandler} variant="info">
        logout
      </Button>
    </Nav>
  )
}

export default Menu
