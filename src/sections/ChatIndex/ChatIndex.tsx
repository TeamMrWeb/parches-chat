import { useRef, useState } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatIndex } from "./useChatIndex"
import { LoggedUserArea, UserQuickOptions, AddFriend, Groups, PrivateChats } from "../../components"

export default function ChatIndex() {
  const chatContainer = useRef<HTMLDivElement>(null)
  const [showQuickOptions, setShowQuickOptions] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile } =
    useChatIndex(chatContainer)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatContainer)

  return (
    <section
      className="chat-index"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Groups />
      <div className="sidebar">
        <PrivateChats
          firstAccess={firstAccess}
          setFirstAccess={setFirstAccess}
          showAddFriend={showAddFriend}
          setShowAddFriend={setShowAddFriend}
        />
        <LoggedUserArea
          showQuickOptions={showQuickOptions}
          setShowQuickOptions={setShowQuickOptions}
        />
        {showQuickOptions && <UserQuickOptions />}
        {showAddFriend && (
          <AddFriend showAddFriend={showAddFriend} setShowAddFriend={setShowAddFriend} />
        )}
      </div>
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
