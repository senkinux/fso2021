import { Link } from "react-router-dom"
import Table from "react-bootstrap/Table"

const Users = ({ userlist }) => {
  return (
    <div>
      <h2>Users</h2>
      <h4 className="text-info mb-4 mt-4">blogs created</h4>
      <Table striped bordered variant="dark" size="sm">
        <tbody>
          {userlist.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`users/${user.id}`} className="text-info">
                  {user.name}
                </Link>
              </td>
              <td className="text-info">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
