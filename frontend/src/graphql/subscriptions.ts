import { gql } from "@apollo/client"

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageAdded {
      id
      text
      createdAt
      author {
        id
      }
    }
  }
`
