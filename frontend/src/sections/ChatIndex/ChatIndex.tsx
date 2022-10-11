import { useRef, useState } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatIndex } from "./useChatIndex"
import Groups from "../../components/Groups/Groups"
import Chats from "../../components/Chats/Chats"
import LoggedUserArea from "../../components/LoggedUserArea/LoggedUserArea"
import UserQuickOptions from "../../components/UserQuickOptions/UserQuickOptions"
import AddFriend from "../../components/AddFriend/AddFriend"

export default function ChatIndex() {
  const chatContainer = useRef()
  const [showQuickOptions, setShowQuickOptions] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById } = useChatIndex(chatContainer)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section className="chat-index" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Groups getChatById={getChatById} />
      <div className="sidebar">
        <Chats
          firstAccess={firstAccess}
          setFirstAccess={setFirstAccess}
          getChatById={getChatById}
          showAddFriend={showAddFriend}
          setShowAddFriend={setShowAddFriend}
        />
        <LoggedUserArea showQuickOptions={showQuickOptions} setShowQuickOptions={setShowQuickOptions} />
        {showQuickOptions && <UserQuickOptions />}
        {showAddFriend && <AddFriend showAddFriend={showAddFriend} setShowAddFriend={setShowAddFriend} />}
      </div>
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
