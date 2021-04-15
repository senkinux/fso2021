import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addBlog, likeBlog } from "./reducers/anecdoteReducer"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    // console.log("vote", id)
    dispatch(likeBlog(id))
  }

  const createBlog = e => {
    e.preventDefault()
    const newBlog = e.target.blog.value
    e.target.blog.value = ""
    dispatch(addBlog(newBlog))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
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

export default App
