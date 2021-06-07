import React from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendation = ({ favGenre, show }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favGenre },
  })

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Your favorite genre ({favGenre}) books: </p>
      {
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {result.data.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Recommendation
