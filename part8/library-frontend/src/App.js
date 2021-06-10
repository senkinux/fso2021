import React, { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import {
  useApolloClient,
  useQuery,
  useLazyQuery,
  useSubscription,
} from "@apollo/client"
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from "./queries"
import Recommendation from "./components/Recommendation"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [getBooksByGenre, { data }] = useLazyQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <div>
        {!token ? (
          <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <LoginForm setToken={setToken} />
          </div>
        ) : (
          <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </div>
        )}
      </div>

      <Authors show={page === "authors"} authorsResult={authorsResult} />

      <Books
        show={page === "books"}
        getBooksByGenre={getBooksByGenre}
        data={data}
      />

      <NewBook show={page === "add"} />

      <Recommendation show={page === "recommendations"} />
    </>
  )
}

export default App
