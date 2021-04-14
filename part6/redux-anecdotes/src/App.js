import React from "react"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    // console.log("vote", id)
    dispatch({ type: "VOTE", payload: { id } })
  }

  const createBlog = e => {
    e.preventDefault()
    const newBlog = e.target.blog.value
    e.target.blog.value = ""
    dispatch({
      type: "CREATE_BLOG",
      payload: {
        content: newBlog,
      },
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
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
