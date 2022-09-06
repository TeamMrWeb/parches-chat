import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import App from "./App"
import "./scss/index.css"

const auth = localStorage.getItem("auth")
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3001/graphql",
    headers: {
      auth
    }
  })
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
  // </React.StrictMode>
)
