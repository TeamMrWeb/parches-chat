import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { verifyQuery } from "../../graphql/queries"

export default function VerifyAccount() {
  const { token } = useParams()
  const navigate = useNavigate()

  const { data, error } = useQuery(verifyQuery, {
    context: {
      headers: {
        authorization: token
      }
    }
  })

  useEffect(() => {
    data?.verify && navigate("/accounts/login")
  }, [data, error])

  return <></>
}
