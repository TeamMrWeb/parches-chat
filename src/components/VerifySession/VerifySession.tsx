import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { RootState } from "../../ts/interfaces"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { startLoaderSpinner } from "../../slicers/loaderSpinnerSlice"
import { LoggedUserId } from "../../graphql/queries"
import { REFRESH_TOKEN } from "../../graphql/mutations"

export default function VerifySession({ children }: { children: JSX.Element }) {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const { lazyQueryMethod: askForRefreshToken } = useFetchingMethod(REFRESH_TOKEN)

  const navigate = useNavigate()
  const userIsLogged = Object.keys(loggedUser).length !== 0
  const { lazyQueryMethod: getLoggedUserId, error } = useFetchingMethod(
    LoggedUserId,
    setLoggedUserField
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = localStorage.getItem("accessToken")
    if (!auth) navigate("/login")
    dispatch(startLoaderSpinner())
    getLoggedUserId()
  }, [])

  useEffect(() => {
    if (error) {
      console.log("access token expired", error)
      askForRefreshToken().then((res: any) => {
        localStorage.setItem("accessToken", res.accessToken)
        localStorage.setItem("refreshToken", res.accessToken)
      })
    }
  }, [error])

  return <>{userIsLogged && children}</>
}
