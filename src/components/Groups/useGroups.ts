import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { setGroups } from "../../slicers/groupsSlice"
import { RootState } from "../../ts/interfaces"

export const useGroups = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const groups = useSelector((state: RootState) => state.groups)

  const { lazyQueryMethod: getUserGroups } = useFetchingMethod(chatsFromLoggedUser, setGroups)

  useEffect(() => {
    loggedUser?.id &&
      getUserGroups({
        variables: { userId: loggedUser.id, isGroup: true }
      })
  }, [loggedUser.id])

  return { groups }
}
