import { useEffect, useState } from "react"
import { getUsers } from "../services/users"

const UserInfo = ({ user }) => {
  return (
    <div>
      <p>
        {user.name} {user.blogs.length}
      </p>
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then(res => setUsers(res))
  })
  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      <ul>
        {users.map(user => (
          <UserInfo key={user.id} user={user} />
        ))}
      </ul>
    </div>
  )
}

export default Users
