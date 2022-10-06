import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"

export const useComunication = () => {
  const httpLink = new HttpLink({
    uri: "https://parches-chat.up.railway.app/graphql"
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
      url: "wss://parches-chat.up.railway.app/subscriptions"
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
