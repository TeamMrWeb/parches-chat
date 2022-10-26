import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { setChats } from "../../slicers/chatsSlice"
import { stopLoaderSpinner } from "../../slicers/loaderSpinnerSlice"

export const usePrivateChats = () => {
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const chats = useSelector((state: any) => state.chats)
  const dispatch = useDispatch()

  const { lazyQueryMethod: getChats, loading } = useFetchingMethod(chatsFromLoggedUser, setChats)

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

  useEffect(() => {
    !loading && chats && dispatch(stopLoaderSpinner())
  }, [loading])

  return { chats, defineChatName }
}
