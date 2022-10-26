import { useChat } from "./useChat"
import ChatInfoHeader from "../ChatInfoHeader/ChatInfoHeader"
import ChatInput from "../ChatInput/ChatInput"
import Messages from "../Messages/Messages"
import downArrowIcon from "../../assets/icons/down-arrow-icon.svg"

export default function Chat({ chatContainer }: { chatContainer: React.RefObject<HTMLDivElement> }) {
  const { showButton, goDown, scrollBottom } = useChat()

  return (
    <div className="chat-container" ref={chatContainer}>
      <ChatInfoHeader />
      <Messages scrollBottom={scrollBottom} />
      <ChatInput />
      {showButton && (
        <button className={"go-down"} onClick={() => goDown()}>
          <img className="go-down__image" src={downArrowIcon} alt="Ícono para ir hacia el abajo" />
        </button>
      )}
    </div>
  )
}
