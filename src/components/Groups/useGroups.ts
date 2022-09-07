import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLazyQueries } from "../../apollo/useLazyQueries"
import { chats } from "../../graphql/queries/queries"
import { setGroups } from "../../slicers/groupsSlice"

export const useGroups = () => {
  const userLogged = useSelector((state: any) => state.userLogged)
  const groups = useSelector((state: any) => state.groups)

  const { lazyQueryMethod: getUserGroups } = useLazyQueries(chats, setGroups)

  useEffect(() => {
    userLogged?.id &&
      getUserGroups({
        variables: { userId: userLogged.id, isGroup: true }
      })
  }, [userLogged.id])

  return { groups }
}
