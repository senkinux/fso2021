import React from "react"

const Anecdote = ({ anecdote }) => {
  console.log({ anecdote })
  const url = anecdote.info
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>{anecdote.votes}</p>
      <p>for more info see {<a href={url}>{url}</a>}</p>
    </div>
  )
}

export default Anecdote
