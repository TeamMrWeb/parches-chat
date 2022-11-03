import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { RootState } from "../../ts/interfaces"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { LoggedUserId } from "../../graphql/queries"

export default function VerifySession({ children }: { children: JSX.Element }) {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const navigate = useNavigate()
  const userIsLogged = Object.keys(loggedUser).length !== 0
  const { lazyQueryMethod: getLoggedUserId } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (!auth) navigate("/login")
    getLoggedUserId()
  }, [])

  return <>{userIsLogged && children}</>
}
