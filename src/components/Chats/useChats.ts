import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromUserLogged } from "../../graphql/queries"
import { setChats } from "../../slicers/chatsSlice"

export const useChats = () => {
  const userLogged = useSelector((state: any) => state.userLogged)
  const chats = useSelector((state: any) => state.chats)

  const { lazyQueryMethod: getUserGroups } = useFetchingMethod(chatsFromUserLogged, setChats)

  useEffect(() => {
    userLogged?.id &&
      getUserGroups({
        variables: { userId: userLogged.id, isGroup: false }
      })
  }, [userLogged.id])

  return { chats }
}
