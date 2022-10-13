import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { messagesByChatId } from "../../graphql/queries"
import { setMessages, clearMessages } from "../../slicers/messagesSlice"

interface author {
  id: string
}

export const useMessages = () => {
  const { lazyQueryMethod: getMessagesByChatId, data } = useFetchingMethod(messagesByChatId, setMessages)
  const [hasMore, setHasMore] = useState(true)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const messages = useSelector((state: any) => state.messages)
  const chat = useSelector((state: any) => state.chat)
  const dispatch = useDispatch()

  const defineMessageSide = (messageAuthor: author) => (messageAuthor.id === loggedUser.id ? "right" : "left")

  const formatCreatedAtDate = (createdAt: Date) => {
    const formatedDate = new Date(createdAt).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })
    return formatedDate
  }

  useEffect(() => {
    if (messages.length !== 0 || !chat.id) return
    dispatch(clearMessages())
    getMessagesByChatId({ variables: { id: chat.id, limit: 25, skip: 0, orderBy: "DESC" } })
  }, [chat])

  const refetchChatMessages = (messagesLength: Number) => {
    getMessagesByChatId({ variables: { id: chat.id, limit: 20, skip: messagesLength, orderBy: "DESC" } })
  }

  useEffect(() => {
    if (data?.chat?.messages.length < 20) setHasMore(false)
  }, [data])

  return { messages, defineMessageSide, formatCreatedAtDate, refetchChatMessages, chat, hasMore }
}
