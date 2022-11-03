import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../ts/interfaces"

export default function VerifySession({ children }: { children: JSX.Element }) {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const navigate = useNavigate()
  const userIsLogged = Object.keys(loggedUser).length !== 0

  useEffect(() => {
    !userIsLogged && navigate("/login")
  }, [])

  return <>{userIsLogged && children}</>
}
