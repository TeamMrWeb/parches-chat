import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { messagesByChatId } from "../../graphql/queries"
import { setMessages, clearMessages } from "../../slicers/messagesSlice"

interface author {
  id: string
}

export const useMessages = () => {
  const { lazyQueryMethod: getMessagesByChatId, loading } = useFetchingMethod(messagesByChatId, setMessages)
  const userLogged = useSelector((state: any) => state.userLogged)
  const messages = useSelector((state: any) => state.messages)
  const chat = useSelector((state: any) => state.chat)
  const dispatch = useDispatch()

  const defineMessageSide = (messageAuthor: author) => (messageAuthor.id === userLogged?.id ? "right" : "left")

  const formatCreatedAtDate = (createdAt: Date) => {
    const formatedDate = new Date(createdAt).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })
    return formatedDate
  }

  useEffect(() => {
    if (messages.length !== 0 && !chat.id) return
    dispatch(clearMessages())
    getMessagesByChatId({ variables: { id: chat.id } })
  }, [loading, chat])

  return { messages, defineMessageSide, formatCreatedAtDate }
}
