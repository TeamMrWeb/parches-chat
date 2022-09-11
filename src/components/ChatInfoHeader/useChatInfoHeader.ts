import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useShowChat } from "../../contexts/ShowChatContext"

interface ChatData {
  username: string
  avatar: string
}

export const useChatInfoHeader = () => {
  const [chatData, setChatData] = useState<ChatData>()
  const { showChat } = useShowChat()
  const chat = useSelector((state: any) => state.chat)

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container")
    if (!showChat && chatContainer) chatContainer.className = "chat-container"
    else if (showChat && chatContainer) chatContainer.className = "chat-container expanded"
  }, [showChat])

  useEffect(() => {
    if (Object.keys(chat).length === 0) return
    const username = chat.users[0].username
    const avatar = chat.users[0].avatar
    setChatData({ ...chatData, username, avatar })
  }, [chat])

  return { showChat, chatData }
}
