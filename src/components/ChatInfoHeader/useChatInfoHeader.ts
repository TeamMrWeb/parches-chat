import { useState } from "react"

export const useChatInfoHeader = () => {
  const [showChat, setShowChat] = useState(false)

  const chatContainer = document.querySelector(".chat-container")
  console.log(chatContainer, showChat)

  if (!showChat && chatContainer) chatContainer.className = "chat-container"
  else if (showChat && chatContainer) chatContainer.className = "chat-container expanded"

  return { showChat, setShowChat }
}
