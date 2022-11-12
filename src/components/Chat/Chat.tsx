import { useRef } from "react"
import { useChat } from "./useChat"
import { ChatInput, Messages, ChatInfoHeader, GroupMembers } from ".."
import downArrowIcon from "../../assets/icons/down-arrow-icon.svg"

export default function Chat({ chatElement }: { chatElement: React.RefObject<HTMLDivElement> }) {
  const { showButton, goDown, scrollBottom, chat } = useChat()
  const groupMembersElement = useRef<HTMLDivElement>(null)

  return (
    <div className="chat-container" ref={chatElement}>
      <ChatInfoHeader />
      <div className="chat-wrapper">
        <div className="chat-content">
          <Messages scrollBottom={scrollBottom} />
          <ChatInput />
        </div>
        {chat.isGroup ? <GroupMembers groupMembersElement={groupMembersElement} /> : null}
      </div>
      {showButton && (
        <button className={"go-down"} onClick={() => goDown()}>
          <img className="go-down__image" src={downArrowIcon} alt="Ícono para ir hacia abajo" />
        </button>
      )}
    </div>
  )
}
