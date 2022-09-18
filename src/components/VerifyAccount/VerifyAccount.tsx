import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { verifyQuery } from "../../graphql/queries"

export default function VerifyAccount() {
  const { token } = useParams()
  const navigate = useNavigate()

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
