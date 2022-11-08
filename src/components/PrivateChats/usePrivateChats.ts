import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { stopLoaderSpinner } from "../../slicers/loaderSpinnerSlice"
import { setChats } from "../../slicers/chatsSlice"
import { RootState, UserProps } from "../../ts/interfaces"

export const usePrivateChats = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const chats = useSelector((state: RootState) => state.chats)
  const dispatch = useDispatch()

  const { lazyQueryMethod: getChats, loading } = useFetchingMethod(chatsFromLoggedUser, setChats)

  const defineChatName = (users: UserProps[] | undefined) => {
    const chatName = users!.find((user: UserProps) => user.id !== loggedUser.id && user)!.username
    return chatName
  }

  useEffect(() => {
    loggedUser?.id &&
      getChats({
        variables: { userId: loggedUser.id, isGroup: false }
      })
  }, [loggedUser.id])

  useEffect(() => {
    !loading && chats.length >= 0 && dispatch(stopLoaderSpinner())
  }, [loading])

  return { chats, defineChatName }
}
