import { useRef, useState } from "react"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatIndex } from "./useChatIndex"
import {
  LoggedUserArea,
  UserQuickOptions,
  AddFriend,
  Groups,
  PrivateChats,
  AddNewGroup
} from "../../components"

export default function ChatIndex() {
  const chatElement = useRef<HTMLDivElement>(null)
  const [showQuickOptions, setShowQuickOptions] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [showAddNewGroup, setShowAddNewGroup] = useState(false)
  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile } =
    useChatIndex(chatElement)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(chatElement)

  return (
    <section
      className="chat-index"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="chat-index-wrapper">
        <Groups setShowAddNewGroup={setShowAddNewGroup} setFirstAccess={setFirstAccess} />
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
          {showAddFriend && <AddFriend setShowAddFriend={setShowAddFriend} />}
          {showAddNewGroup && <AddNewGroup setShowAddNewGroup={setShowAddNewGroup} />}
        </div>
      </div>
      {notMobile ? desktopBehaviour() : mobileBehaviour()}
    </section>
  )
}
