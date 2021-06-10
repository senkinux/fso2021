import React from "react"
import { ALL_BOOKS, ME } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendation = ({ show }) => {
  const meResult = useQuery(ME)

  const meFavGenre = meResult?.data?.me?.favoriteGenre

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: meFavGenre },
  })

  if (!show) {
    return null
  }

  if (result.loading || meResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Your favorite genre ({meFavGenre}) books: </p>
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
