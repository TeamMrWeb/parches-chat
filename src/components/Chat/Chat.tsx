import { useEffect } from "react"
import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import { useShowChatContainerContext } from "../../contexts/ShowChatContainerContext"
import { ChatInput, Messages, ChatInfoHeader } from ".."
import ChatInfoSidebar from "../ChatInfoSidebar/ChatInfoSidebar"
import { useChat } from "./useChat"
import downArrowIcon from "../../assets/icons/down-arrow-icon.svg"

export default function Chat() {
  const { showButton, goDown, scrollBottom, chat } = useChat()
  const { showChatInfoSidebar } = useShowChatInfoSidebarContext()
  const { showChatContainer } = useShowChatContainerContext()

  useEffect(() => {
    console.log({ showChatContainer })
  }, [showChatContainer])

  return (
    <div className={`chat-container ${!showChatContainer ? "disabled" : ""}`}>
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
