import { Link } from "react-router-dom"
import Table from "react-bootstrap/Table"

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null
  }
  return (
    <>
      <h2 className="mt-4">blogs</h2>
      <Table striped bordered variant="dark" size="sm">
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/api/blogs/${blog.id}`} className="text-info">
                    {blog.title}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
