import React from "react"
import { addBlog } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import service from "../service"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createBlog = e => {
    e.preventDefault()
    const newBlog = e.target.blog.value
    e.target.blog.value = ""
    service.create(newBlog).then(res => {
      dispatch(addBlog(res))
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <input name="blog" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
