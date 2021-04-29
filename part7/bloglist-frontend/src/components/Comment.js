import { useState } from "react"
import service from "../services/blogs"
import { initializeBlogs } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Comment = ({ id }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const submitComment = async e => {
    e.preventDefault()
    await service.sendComment(id, { content: comment })
    dispatch(initializeBlogs())
    setComment("")
  }
  return (
    <div>
      <Form onSubmit={submitComment}>
        <Form.Control
          className="mb-4"
          type="input"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <Button variant="success">add comment</Button>
      </Form>
    </div>
  )
}

export default Comment
