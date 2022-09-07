import { gql } from "@apollo/client"

export const userLoggedId = gql`
  query {
    user {
      id
    }
  }
`
export const verifyQuery = gql`
  query verifyAccountByToken($token: String!) {
    verify(token: $token)
  }
`

export const chats = gql`
  query getChatsFromUser($userId: ID!, $isGroup: Boolean) {
    chats(userId: $userId, isGroup: $isGroup) {
      id
      name
      isGroup
      secure
      private
    }
  }
`
