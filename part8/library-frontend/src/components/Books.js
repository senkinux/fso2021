import React, { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({ show, getBooksByGenre, data }) => {
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    getBooksByGenre()
  }, [getBooksByGenre])

  if (!show) {
    return null
  }

  const books = result.data.allBooks

  const genres = books.map(book => book.genres)

  const genresList = [].concat(...genres)

  const filteredGenres = Array(...new Set(genresList))

  const filterBooks = filterWord => {
    getBooksByGenre({ variables: { genre: filterWord } })
  }

  return (
    <div>
      <h2>books</h2>
      <h4>Filter Genres By:</h4>

      {filteredGenres.map(item => (
        <button key={item} onClick={() => filterBooks(item)}>
          {item}
        </button>
      ))}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!data ? (
            <div>Loading...</div>
          ) : (
            data.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
