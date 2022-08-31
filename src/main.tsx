import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./scss/index.css"
// import "swiper/css/bundle"
import { store } from "./store/store"
import { Provider } from "react-redux"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

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
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
