import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

interface author {
  id: string
}

export const useMessages = () => {
  const [messages, setMessages] = useState<any>([])
  const chat = useSelector((state: any) => state.chat)
  const userLogged = useSelector((state: any) => state.userLogged)

  const defineMessageSide = (messageAuthor: author) => (messageAuthor.id === userLogged?.id ? "left" : "right")

  useEffect(() => {
    if (Object.keys(chat).length === 0) return
    const chatMessages = chat.messages
    setMessages([...messages, ...chatMessages])
  }, [chat])

  return { messages, defineMessageSide }
}
