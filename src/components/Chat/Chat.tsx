import { useChat } from "./useChat"
import { ChatInput, Messages, ChatInfoHeader } from ".."
import downArrowIcon from "../../assets/icons/down-arrow-icon.svg"
import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import ChatInfoSidebar from "../ChatInfoSidebar/ChatInfoSidebar"

export default function Chat({ chatElement }: { chatElement: React.RefObject<HTMLDivElement> }) {
  const { showButton, goDown, scrollBottom, chat } = useChat()
  const { showChatInfoSidebar } = useShowChatInfoSidebarContext()

  return (
    <div className="chat-container" ref={chatElement}>
      <ChatInfoHeader />
      <div className="chat-wrapper">
        <div className="chat-content">
          <Messages scrollBottom={scrollBottom} />
          <ChatInput />
        </div>
        {showChatInfoSidebar ? <ChatInfoSidebar chat={chat} /> : null}
      </div>
      {showButton && (
        <button className={"go-down"} onClick={() => goDown()}>
          <img className="go-down__image" src={downArrowIcon} alt="Ícono para ir hacia abajo" />
        </button>
      )}
    </div>
  )
}
