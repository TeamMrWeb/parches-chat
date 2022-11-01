import { gql } from "@apollo/client"

export const LoggedUserId = gql`
  query {
    user {
      id
      username
      avatar {
        secure_url
      }
    }
  }
`
export const verifyQuery = gql`
  query verifyAccountByToken($token: String!) {
    verify(token: $token)
  }
`

export const chatsFromLoggedUser = gql`
  query getChatsFromUser($userId: ID!, $isGroup: Boolean) {
    chats(userId: $userId, isGroup: $isGroup) {
      id
      avatar {
        secure_url
      }
      name
      isGroup
      secure
      private
      users {
        id
        username
      }
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
        avatar {
          secure_url
        }
      }
    }
  }
`

export const messagesByChatId = gql`
  query getMessagesByChatId($id: ID!, $limit: Int, $skip: Int, $orderBy: String) {
    chat(id: $id) {
      messages(limit: $limit, skip: $skip, orderBy: $orderBy) {
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

export const usersByUsername = gql`
  query user($username: String!) {
    users(username: $username) {
      id
      username
      avatar {
        secure_url
      }
      email
      isVerified
    }
  }
`

export const SEND_EMAIL_VERIFICATION = gql`
  query SEND_EMAIL_VERIFICATION($email: String!) {
    sendEmailVerification(email: $email)
  }
`
