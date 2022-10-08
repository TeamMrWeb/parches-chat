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

export const LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION = gql`
  subscription OnNewMessageFromChat($userId: ID!) {
    userMessageNotification(userId: $userId) {
      id
      text
      createdAt
      author {
        id
      }
    }
  }
`
