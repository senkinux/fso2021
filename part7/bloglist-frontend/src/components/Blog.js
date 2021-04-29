import Comment from "./Comment"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

const Blog = ({ blog, likeHandler }) => {
  if (!blog) {
    return null
  }
  const url = blog.url
  return (
    <div>
      <h1 className="pb-2">
        {blog.title} by {blog.author}
      </h1>
      <div>
        <a href={`${url}`}>
          <b className="text-danger">{url}</b>
        </a>
        <p className="mt-4">
          {blog.likes} likes{" "}
          <Button variant="success" onClick={() => likeHandler(blog)}>
            like
          </Button>
        </p>
        <p>added by {blog.user.name}</p>
        <h3>comments</h3>
        <Comment id={blog.id} />
        <Table className="mt-4" size="sm">
          <tbody>
            {blog.comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default Blog
