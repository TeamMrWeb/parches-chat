import { useChat } from "./useChat"
import { ChatInput, Messages, ChatInfoHeader } from ".."
import downArrowIcon from "../../assets/icons/down-arrow-icon.svg"
import GroupMembers from "../GroupMembers/GroupMembers"

export default function Chat({
  chatContainer
}: {
  chatContainer: React.RefObject<HTMLDivElement>
}) {
  const { showButton, goDown, scrollBottom, chat } = useChat()

  return (
    <div className="chat-container" ref={chatContainer}>
      <ChatInfoHeader />
      <div className="chat-wrapper">
        <div className="chat-content">
          <Messages scrollBottom={scrollBottom} />
          <ChatInput />
        </div>
        {chat.isGroup ? <GroupMembers /> : null}
      </div>
      {showButton && (
        <button className={"go-down"} onClick={() => goDown()}>
          <img className="go-down__image" src={downArrowIcon} alt="Ícono para ir hacia abajo" />
        </button>
      )}
    </div>
  )
}
