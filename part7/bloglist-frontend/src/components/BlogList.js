import { Link } from "react-router-dom"

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null
  }
  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <li key={blog.id}>
              <Link to={`/api/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

export default BlogList
