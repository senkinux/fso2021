import { useState } from "react"
import service from "../services/blogs"
import { initializeBlogs } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"

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
      <form onSubmit={submitComment}>
        <input value={comment} onChange={e => setComment(e.target.value)} />
        <button>add comment</button>
      </form>
    </div>
  )
}

export default Comment
