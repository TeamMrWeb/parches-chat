import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { setChats } from "../../slicers/chatsSlice"

export const useChats = () => {
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const chats = useSelector((state: any) => state.chats)

  const { lazyQueryMethod: getChats } = useFetchingMethod(chatsFromLoggedUser, setChats)

  const defineChatName = (users: any) => {
    const chatName = users.find((user: any) => user.id !== loggedUser.id && user).username
    return chatName
  }

  useEffect(() => {
    loggedUser?.id &&
      getChats({
        variables: { userId: loggedUser.id, isGroup: false }
      })
  }, [loggedUser.id])

  return { chats, defineChatName }
}
