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
