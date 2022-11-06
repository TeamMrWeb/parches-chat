import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { RootState } from "../../ts/interfaces"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { startLoaderSpinner } from "../../slicers/loaderSpinnerSlice"
import { LoggedUserId } from "../../graphql/queries"

export default function VerifySession({ children }: { children: JSX.Element }) {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const navigate = useNavigate()
  const userIsLogged = Object.keys(loggedUser).length !== 0
  const { lazyQueryMethod: getLoggedUserId } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (!auth) navigate("/login")
    dispatch(startLoaderSpinner())
    getLoggedUserId()
  }, [])

  return <>{userIsLogged && children}</>
}
