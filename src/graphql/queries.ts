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
  query {
    verify
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
        status
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
      id
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
      verified
    }
  }
`

export const SEND_EMAIL_VERIFICATION = gql`
  query SEND_EMAIL_VERIFICATION($email: String!) {
    sendEmailVerification(email: $email)
  }
`
export const GET_FRIENDS_FROM_LOGGED_USER = gql`
  query {
    friends(status: 1) {
      id
      username
      avatar {
        secure_url
      }
      email
      verified
    }
  }
`
