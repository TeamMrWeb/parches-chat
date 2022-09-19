import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"

export const useComunication = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
  })

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => ({
      headers: {
        auth: localStorage.getItem("auth")
      }
    }))
    return forward(operation)
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/subscriptions"
    })
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    authLink.concat(httpLink)
  )

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
  })

  return { client }
}
