import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useChat = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.auth
    !auth && navigate("/login")
  }, [])
}
