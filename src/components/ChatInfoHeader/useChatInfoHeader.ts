import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useShowChat } from "../../contexts/ShowChatContext"
import { ChatDataProps, RootState, UserProps } from "../../ts/interfaces"

export const useChatInfoHeader = () => {
  const [chatData, setChatData] = useState<ChatDataProps>()
  const { showChat } = useShowChat()
  const chat = useSelector((state: RootState) => state.chat)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container")
    if (!showChat && chatContainer) chatContainer.className = "chat-container"
    else if (showChat && chatContainer) chatContainer.className = "chat-container expanded"
  }, [showChat])

  useEffect(() => {
    if (Object.keys(chat).length === 0) return
    if (chat.isGroup) {
      const name = chat.name!
      const avatar = chat.avatar!
      setChatData({ ...chatData, name, avatar })
    } else {
      const loggedUserId = loggedUser.id
      const name = chat?.users?.find((user: UserProps) => user.id !== loggedUserId)?.username!
      const avatar = chat.users![0].avatar
      setChatData({ ...chatData, name, avatar })
    }
  }, [chat])

  return { showChat, chatData }
}
