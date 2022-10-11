import ChatInfoHeader from "../ChatInfoHeader/ChatInfoHeader"
import ChatInput from "../ChatInput/ChatInput"
import Messages from "../Messages/Messages"
import { useChat } from "./useChat"

export default function Chat({ chatContainer }: { chatContainer: any }) {
  useChat()

  return (
    <div className="chat-container" ref={chatContainer}>
      <ChatInfoHeader />
      <Messages />
      <ChatInput />
    </div>
  )
}
