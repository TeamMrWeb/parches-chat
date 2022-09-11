import { useRef } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatIndex } from "./useChatIndex"
import Groups from "../../components/Groups/Groups"
import Chats from "../../components/Chats/Chats"

export default function ChatIndex() {
  const chatContainer = useRef()
  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById } = useChatIndex(chatContainer)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups getChatById={getChatById} />
      <Chats firstAccess={firstAccess} setFirstAccess={setFirstAccess} getChatById={getChatById} />
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
