import { useRef, useState } from "react"
import { useShowChat } from "../../contexts/ShowChatContext"
import { useSwipe } from "../../hooks/useSwipe"
import Friends from "../../components/Friends/Friends"
import Groups from "../../components/Groups/Groups"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"

export default function ChatIndex() {
  const { showChat } = useShowChat()
  const chatContainer = useRef()
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)
  const maxMobileDeviceWidth = 480
  const notMobile = window.screen.width >= maxMobileDeviceWidth
  const [firstAccess, setFirstAccess] = useState(!notMobile)

  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups />
      <Friends firstAccess={firstAccess} setFirstAccess={setFirstAccess} />
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
