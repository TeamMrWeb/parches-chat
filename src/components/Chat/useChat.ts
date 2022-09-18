import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSubscription } from "@apollo/client"
import { setNewLoggedUserMessage } from "../../slicers/messagesSlice"
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions"

export const useChat = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION)

  useEffect(() => {
    const auth = localStorage.auth
    !auth && navigate("/login")
  }, [])

  useEffect(() => {
    data && dispatch(setNewLoggedUserMessage(data))
  }, [data])

  return {}
}
