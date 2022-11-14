import { useState } from "react"
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
import { useShowChatIndexWrapperContext } from "../../contexts/showChatIndexWrapperContext"

export default function ChatIndex() {
  const [showQuickOptions, setShowQuickOptions] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [showAddNewGroup, setShowAddNewGroup] = useState(false)
  const { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile } =
    useChatIndex()
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe()
  const { showChatIndexWrapper } = useShowChatIndexWrapperContext()

  return (
    <section
      className="chat-index"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`chat-index-wrapper ${!showChatIndexWrapper ? "disabled" : ""}`}>
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
