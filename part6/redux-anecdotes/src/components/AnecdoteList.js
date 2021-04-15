import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { likeBlog } from "../reducers/anecdoteReducer"
import { setMessage, removeMessage } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filterState.toLowerCase())
  )
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(likeBlog(id))
    const filteredAnecdote = anecdotes.filter(a =>
      a.id === id ? a.content : ""
    )
    const likedAnecdote = filteredAnecdote[0].content
    dispatch(setMessage(likedAnecdote))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <>
      {filteredAnecdotes
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
    </>
  )
}

export default AnecdoteList
