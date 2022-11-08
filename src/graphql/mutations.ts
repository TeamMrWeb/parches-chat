import { gql } from "@apollo/client"

export const userRegister = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $authStrategy: String
  ) {
    register(username: $username, email: $email, password: $password, authStrategy: $authStrategy)
  }
`

export const userLogin = gql`
  mutation LoginUser($email: String!, $password: String!, $authStrategy: String) {
    login(email: $email, password: $password, authStrategy: $authStrategy)
  }
`

export const createMessage = gql`
  mutation createMessage($chatId: ID!, $text: String!, $hasImage: Boolean!) {
    createMessage(chatId: $chatId, text: $text, hasImage: $hasImage) {
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
