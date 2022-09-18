import { gql } from "@apollo/client"

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage($postID: ID!) {
    messageAdded(postID: $postID) {
      id
      content
    }
  }
`
