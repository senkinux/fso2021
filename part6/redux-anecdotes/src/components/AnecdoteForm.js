import React from "react"
import { addBlog } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"

const AnecdoteForm = props => {
  const createBlog = e => {
    e.preventDefault()
    const newBlog = e.target.blog.value
    e.target.blog.value = ""
    props.addBlog(newBlog)
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

const mapDispatchToProps = { addBlog }

export default connect(null, mapDispatchToProps)(AnecdoteForm)
