import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { messagesByChatId } from "../../graphql/queries"
import { setMessages, clearMessages } from "../../slicers/messagesSlice"
import { AuthorProps, RootState } from "../../ts/interfaces"

export const useMessages = () => {
  const {
    lazyQueryMethod: getMessagesByChatId,
    data,
    loading
  } = useFetchingMethod(messagesByChatId, setMessages)
  const [hasMore, setHasMore] = useState(true)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const messages = useSelector((state: RootState) => state.messages)
  const chat = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()

  const defineMessageSide = (messageAuthor: AuthorProps) =>
    messageAuthor.id === loggedUser.id ? "right" : "left"

  const formatCreatedAtDate = (createdAt: Date) => {
    const hours = new Date(createdAt).getHours()
    const minutes = new Date(createdAt).getMinutes()
    const formatedDate = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${hours < 12 ? "AM" : "PM"}`
    return formatedDate
  }

  useEffect(() => {
    if (!chat.id) return
    dispatch(clearMessages())
    getMessagesByChatId({ variables: { id: chat.id, limit: 25, skip: 0, orderBy: "DESC" } })
  }, [chat])

  const refetchChatMessages = (messagesLength: Number) => {
    getMessagesByChatId({
      variables: { id: chat.id, limit: 20, skip: messagesLength, orderBy: "DESC" }
    })
  }

  useEffect(() => {
    if (data?.chat?.messages.length < 20) setHasMore(false)
  }, [data])

  return {
    messages,
    defineMessageSide,
    formatCreatedAtDate,
    refetchChatMessages,
    chat,
    hasMore,
    loading
  }
}
