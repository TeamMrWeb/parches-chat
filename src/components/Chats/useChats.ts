import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLazyQueries } from "../../apollo/useLazyQueries"
import { chatsFromUserLogged } from "../../graphql/queries/queries"
import { setChats } from "../../slicers/chatsSlice"

export const useChats = () => {
  const userLogged = useSelector((state: any) => state.userLogged)
  const chats = useSelector((state: any) => state.chats)

  const { lazyQueryMethod: getUserGroups } = useLazyQueries(chatsFromUserLogged, setChats)

  useEffect(() => {
    userLogged?.id &&
      getUserGroups({
        variables: { userId: userLogged.id, isGroup: false }
      })
  }, [userLogged.id])

  return { chats }
}
