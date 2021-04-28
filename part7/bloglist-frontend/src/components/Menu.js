import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer"
import { useHistory } from "react-router-dom"

const Menu = ({ loggedInUser, dispatch }) => {
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logoutUser())
    history.push("/")
  }

  const padding = {
    paddingRight: 5,
  }

  if (!loggedInUser) {
    return null
  }

  return (
    <div>
      <div>
        <Link to="/api/blogs" style={padding}>
          blogs
        </Link>
        <Link to="/api/users" style={padding}>
          users
        </Link>
        {`${loggedInUser.username} is logged in `}
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  )
}

export default Menu
