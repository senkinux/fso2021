import Button from "react-bootstrap/Button"
import React from "react"
import BlogForm from "./BlogForm"

const ShowBlogForm = ({ setBlogFormVisible, blogFormVisible, createBlog }) => {
  const hideWhenVisible = { display: blogFormVisible ? "none" : "" }
  const showWhenVisible = { display: blogFormVisible ? "" : "none" }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={() => setBlogFormVisible(!blogFormVisible)}>
          New Blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={createBlog} />
        <Button
          className="mb-4"
          variant="danger"
          onClick={() => setBlogFormVisible(!blogFormVisible)}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default ShowBlogForm
