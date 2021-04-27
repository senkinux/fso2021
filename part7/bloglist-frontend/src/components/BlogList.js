import Blog from "../components/Blog"

const BlogList = ({ blogs, deleteHandler, likeHandler }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteHandler={() => deleteHandler(blog)}
            likeHandler={() => likeHandler(blog)}
          />
        ))}
    </>
  )
}

export default BlogList
