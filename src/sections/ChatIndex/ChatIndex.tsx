import { useRef } from "react"
import Chat from "../../components/Chat/Chat"
import Friends from "../../components/Friends/Friends"
import Groups from "../../components/Groups/Groups"
import { useSwipe } from "../../hooks/useSwipe"

export default function ChatIndex() {
  const chatContainer = useRef()
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* <div className="cosa" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}> */}
      <Groups />
      <Friends />
      {/* </div> */}
      {/* <div className="cosa" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}> */}

      <Chat chatContainer={chatContainer} />
      {/* </div> */}
    </section>
  )
}
