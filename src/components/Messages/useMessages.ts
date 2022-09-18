import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLazyQueries } from "../../apollo/useLazyQueries"
import { messagesByChatId } from "../../graphql/queries"
import { setMessages } from "../../slicers/messagesSlice"

interface author {
  id: string
}

export const useMessages = () => {
  const { lazyQueryMethod: getMessagesByChatId, loading } = useLazyQueries(messagesByChatId, setMessages)
  const userLogged = useSelector((state: any) => state.userLogged)
  const messages = useSelector((state: any) => state.messages)
  const chat = useSelector((state: any) => state.chat)

  const defineMessageSide = (messageAuthor: author) => (messageAuthor.id === userLogged?.id ? "left" : "right")

  const formatCreatedAtDate = (createdAt: Date) => {
    const formatedDate = new Date(createdAt).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })
    return formatedDate
  }

  useEffect(() => {
    if (messages.length !== 0 && !chat.id) return
    getMessagesByChatId({ variables: { id: chat.id } })
  }, [loading, chat])

  return { messages, defineMessageSide, formatCreatedAtDate }
}
