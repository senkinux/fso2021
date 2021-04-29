import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const submitBlog = async e => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <Form onSubmit={submitBlog}>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Form.Label>author</Form.Label>
        <Form.Control
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <Form.Label>url</Form.Label>
        <Form.Control
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button className="mt-2 mb-2" variant="success">
          create
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
