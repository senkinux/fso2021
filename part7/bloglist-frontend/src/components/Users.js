import { Link } from "react-router-dom"

const Users = ({ userlist }) => {
  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      <ul>
        {userlist.map(user => (
          <li key={user.id}>
            <Link to={`users/${user.id}`}>{user.name}</Link>
            <span style={{ marginLeft: 10 }}>{user.blogs.length}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
