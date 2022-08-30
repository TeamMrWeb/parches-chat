import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./scss/index.css"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3001/graphql",
    fetchOptions: {
      mode: "no-cors"
    }
  })
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
)
