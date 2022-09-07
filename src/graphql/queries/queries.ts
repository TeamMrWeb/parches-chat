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
  query getChatsFromUser($userId: String!, $isGroup: boolean) {
    chats(userId: $userId) {
      id
    }
  }
`
