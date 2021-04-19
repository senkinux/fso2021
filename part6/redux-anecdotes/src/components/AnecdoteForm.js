import React from "react"
import { addBlog } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createBlog = e => {
    e.preventDefault()
    const newBlog = e.target.blog.value
    e.target.blog.value = ""
    dispatch(addBlog(newBlog))
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
