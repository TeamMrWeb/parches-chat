import { useEffect, useState } from "react"

export const useChatInfoHeader = () => {
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container")
    if (!showChat && chatContainer) chatContainer.className = "chat-container"
    else if (showChat && chatContainer) chatContainer.className = "chat-container expanded"
  }, [showChat])

  return { showChat, setShowChat }
}
