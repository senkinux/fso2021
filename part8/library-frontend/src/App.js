import React, { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ME } from "./queries"
import Recommendation from "./components/Recommendation"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  const me = useQuery(ME)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const userFavGenre = me.data.me.favoriteGenre

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

      <Authors authors={result.data.allAuthors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendation
        show={page === "recommendations"}
        favGenre={userFavGenre}
      />
    </>
  )
}

export default App
