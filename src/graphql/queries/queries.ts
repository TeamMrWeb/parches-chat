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

export const chatsFromUserLogged = gql`
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

export const chatById = gql`
  query getChatById($id: ID!) {
    chat(id: $id) {
      id
      name
      owner {
        username
      }
      isGroup
      secure
      private
      users {
        id
        username
        avatar
      }
      messages {
        id
        text
        createdAt
        author {
          id
        }
      }
    }
  }
`
