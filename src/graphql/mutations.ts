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
