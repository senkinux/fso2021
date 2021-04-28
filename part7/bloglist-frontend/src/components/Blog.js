const Blog = ({ blog, likeHandler }) => {
  if (!blog) {
    return null
  }
  const url = blog.url
  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <div>
        <a href={`${url}`}>{url}</a>
        <p>
          {blog.likes} likes{" "}
          <button onClick={() => likeHandler(blog)}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
      </div>
    </div>
  )
}
export default Blog
