import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ChatInfoHeader from "../ChatInfoHeader/ChatInfoHeader"
import ChatInput from "../ChatInput/ChatInput"
import Messages from "../Messages/Messages"

export default function Chat({ chatContainer }: { chatContainer: any }) {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.auth
    !auth && navigate("/login")
  }, [])

  return (
    <div className="chat-container" ref={chatContainer}>
      <ChatInfoHeader />
      <Messages />
      <ChatInput />
    </div>
  )
}
