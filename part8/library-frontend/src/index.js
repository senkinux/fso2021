import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client"
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
})

const query = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`

client.query({ query }).then(res => console.log(res.data))

ReactDOM.render(<App />, document.getElementById("root"))
