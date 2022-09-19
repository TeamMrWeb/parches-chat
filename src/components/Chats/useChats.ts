import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromUserLogged } from "../../graphql/queries"
import { setChats } from "../../slicers/chatsSlice"

export const useChats = () => {
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const chats = useSelector((state: any) => state.chats)

  const { lazyQueryMethod: getUserGroups } = useFetchingMethod(chatsFromUserLogged, setChats)

  useEffect(() => {
    loggedUser?.id &&
      getUserGroups({
        variables: { userId: loggedUser.id, isGroup: false }
      })
  }, [loggedUser.id])

  return { chats }
}
