import Table from "react-bootstrap/Table"

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4 className="text-info mb-4 mt-4">added blogs</h4>
      <Table striped bordered variant="dark" size="sm">
        <tbody>
          {user.blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
