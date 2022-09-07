import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"

export default function VerifyAccount() {
  const { token } = useParams()
  const navigate = useNavigate()

  const verifyQuery = gql`
    query verifyAccountByToken($token: String!) {
      verify(token: $token)
    }
  `

  const { data, error } = useQuery<any>(verifyQuery, {
    variables: { token },
    context: {
      headers: {
        authorization: token
      }
    }
  })

  useEffect(() => {
    console.log(data, error)
    data?.verify && navigate("/accounts/login")
  }, [data, error])

  return <></>
}
