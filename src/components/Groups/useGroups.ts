import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromUserLogged } from "../../graphql/queries"
import { setGroups } from "../../slicers/groupsSlice"

export const useGroups = () => {
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const groups = useSelector((state: any) => state.groups)

  const { lazyQueryMethod: getUserGroups } = useFetchingMethod(chatsFromUserLogged, setGroups)

  useEffect(() => {
    loggedUser?.id &&
      getUserGroups({
        variables: { userId: loggedUser.id, isGroup: true }
      })
  }, [loggedUser.id])

  return { groups }
}
