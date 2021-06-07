import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = props => {
  const result = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState(null)

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  const genres = books.map(book => book.genres)

  const genresList = [].concat(...genres)

  const filteredGenres = Array(...new Set(genresList))

  const filterBooks = filterWord => {
    setFilteredBooks(books.filter(book => book.genres.includes(filterWord)))
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
          {!filteredBooks
            ? books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : filteredBooks.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
