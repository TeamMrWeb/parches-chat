import { useRef } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import Friends from "../../components/Friends/Friends"
import Groups from "../../components/Groups/Groups"
import Chat from "../../components/Chat/Chat"

export default function ChatIndex() {
  const chatContainer = useRef()
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups />
      <Friends />
      <Chat chatContainer={chatContainer} />
    </section>
  )
}
