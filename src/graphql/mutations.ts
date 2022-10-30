import { gql } from "@apollo/client"

export const userRegister = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`

export const userLogin = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const createMessage = gql`
  mutation createMessage($chatId: ID!, $text: String!) {
    createMessage(chatId: $chatId, text: $text) {
      id
    }
  }
`

export const sendFriendRequestToUser = gql`
  mutation sendFriendRequestToUser($userId: ID!, $senderId: ID!) {
    sendFriendRequest(userId: $userId, senderId: $senderId)
  }
`

export const createChatBetweenFriends = gql`
  mutation createChat($name: String!, $usersId: [ID!]!) {
    createChat(name: $name, usersId: $usersId) {
      id
      name
      avatar {
        secure_url
      }
      users {
        username
      }
    }
  }
`
export const registerWithGoogle = gql`
  mutation registerWithGoogle($username: String!, $email: String!) {
    register(username: "manu", email: "manuandres864@gmail.com", authStrategy: "google")
  }
`
export const loginWithGoogle = gql`
  mutation loginWithGoogle($email: String!) {
    login(email: "manuandres864@gmail.com", authStrategy: "google")
  }
`
