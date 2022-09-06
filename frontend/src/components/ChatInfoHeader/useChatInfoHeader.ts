import { useEffect } from "react"
import { useShowChat } from "../../contexts/ShowChatContext"

export const useChatInfoHeader = () => {
  const { showChat } = useShowChat()

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container")
    if (!showChat && chatContainer) chatContainer.className = "chat-container"
    else if (showChat && chatContainer) chatContainer.className = "chat-container expanded"
  }, [showChat])

  return { showChat }
}
