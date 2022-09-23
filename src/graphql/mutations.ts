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

export const addFriend = gql`
  mutation addFriend($userId: ID!) {
    addUserFriend(userId: $userId) {
      id
      username
    }
  }
`

export const createChatBetweenFriends = gql`
  mutation createChat($name: String!, $usersId: [ID!]!) {
    createChat(name: $name, usersId: $usersId) {
      id
      name
      avatar
      users {
        username
      }
    }
  }
`
