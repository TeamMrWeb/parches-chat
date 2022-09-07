import { useEffect } from "react"
import { useSelector } from "react-redux"
import { setUserLoggedField } from "../../slicers/userLoggedSlice"
import { userLoggedId } from "../../graphql/queries/queries"
import { useLazyQueries } from "../../apollo/useLazyQueries"

export const useChatIndex = () => {
  const userLogged = useSelector((state: any) => state.userLogged)
  const { lazyQueryMethod: getUserLoggedId, loading } = useLazyQueries(userLoggedId, setUserLoggedField)

  useEffect(() => {
    const userAlreadyLogged = Object.keys(userLogged).length !== 0
    if (userAlreadyLogged) return
    getUserLoggedId()
  }, [userLogged, loading])

  return {}
}
