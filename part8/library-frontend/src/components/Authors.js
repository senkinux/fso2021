import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = ({ show, authors }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null
  }

  const submitHandler = e => {
    e.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(born) } })

    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">name: </label>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <label htmlFor="born">born :</label>
        <input
          name="born"
          value={born}
          onChange={e => setBorn(e.target.value)}
        />
        <br />
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
