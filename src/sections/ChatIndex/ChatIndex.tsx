import { useRef, useState } from "react"
import { useShowChat } from "../../contexts/ShowChatContext"
import { useSwipe } from "../../hooks/useSwipe"
import Chats from "../../components/Chats/Chats"
import Groups from "../../components/Groups/Groups"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"
import { useChatIndex } from "./useChatIndex"

export default function ChatIndex() {
  const { showChat } = useShowChat()
  const chatContainer = useRef()
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)
  const maxMobileDeviceWidth = 480
  const notMobile = window.screen.width >= maxMobileDeviceWidth
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  useChatIndex()
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups />
      <Chats firstAccess={firstAccess} setFirstAccess={setFirstAccess} />
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
