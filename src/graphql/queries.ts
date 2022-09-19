import { gql } from "@apollo/client"

export const LoggedUserId = gql`
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
    }
  }
`

export const messagesByChatId = gql`
  query getMessagesByChatId($id: ID!) {
    chat(id: $id) {
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
