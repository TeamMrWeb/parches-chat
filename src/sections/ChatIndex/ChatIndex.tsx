import { useRef, useState } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatIndex } from "./useChatIndex"
import Groups from "../../components/Groups/Groups"
import Chats from "../../components/Chats/Chats"
import LoggedUserArea from "../../components/LoggedUserArea/LoggedUserArea"
import UserQuickOptions from "../../components/UserQuickOptions/UserQuickOptions"

export default function ChatIndex() {
  const chatContainer = useRef()
  const [showQuickOptions, setShowQuickOptions] = useState<boolean>(false)
  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById } = useChatIndex(chatContainer)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups getChatById={getChatById} />
      <div className="sidebar">
        <Chats firstAccess={firstAccess} setFirstAccess={setFirstAccess} getChatById={getChatById} />
        <LoggedUserArea showQuickOptions={showQuickOptions} setShowQuickOptions={setShowQuickOptions} />
        {showQuickOptions && <UserQuickOptions />}
      </div>
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
// Dispatch<SetStateAction<boolean>>
