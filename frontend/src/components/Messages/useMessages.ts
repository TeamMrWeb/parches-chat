import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { messagesByChatId } from "../../graphql/queries"
import { setMessages, clearMessages } from "../../slicers/messagesSlice"

interface author {
  id: string
}

export const useMessages = () => {
  const { lazyQueryMethod: getMessagesByChatId } = useFetchingMethod(messagesByChatId, setMessages)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const messages = useSelector((state: any) => state.messages)
  const chat = useSelector((state: any) => state.chat)
  const dispatch = useDispatch()
  const scrollBottom = useRef<HTMLDivElement>(null)

  const defineMessageSide = (messageAuthor: author) => (messageAuthor.id === loggedUser?.id ? "right" : "left")

  const formatCreatedAtDate = (createdAt: Date) => {
    const formatedDate = new Date(createdAt).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })
    return formatedDate
  }

  useEffect(() => {
    messages && scrollBottom && scrollBottom.current && scrollBottom.current.scrollIntoView()
  }, [messages])

  useEffect(() => {
    if (messages.length !== 0 && !chat.id) return
    dispatch(clearMessages())
    getMessagesByChatId({ variables: { id: chat.id } })
  }, [chat])

  return { messages, defineMessageSide, formatCreatedAtDate, scrollBottom }
}
