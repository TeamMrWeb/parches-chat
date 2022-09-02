import ChatInfoHeader from "../ChatInfoHeader/ChatInfoHeader"
import ChatInput from "../ChatInput/ChatInput"
import Messages from "../Messages/Messages"

export default function Chat({ chatContainer }: { chatContainer: any }) {
  console.log("soyputo")

  return (
    <div className="chat-container" ref={chatContainer}>
      <ChatInfoHeader />
      <Messages />
      <ChatInput />
    </div>
  )
}
