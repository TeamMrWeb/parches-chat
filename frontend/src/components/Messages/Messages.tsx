import { useEffect, useRef } from "react"
import { useShowChat } from "../../contexts/ShowChatContext"
import Message from "../Message/Message"
import { useMessages } from "./useMessages"

interface author {
  id: string
}

interface Message {
  id: string
  text: string
  seen: Array<any>
  edited: boolean
  author: author
  createdAt: Date
  updatedAt: Date
}

export default function Messages() {
  const { showChat } = useShowChat()
  const scrollBottom = useRef<null | HTMLDivElement>(null)
  const { messages, defineMessageSide, formatCreatedAtDate } = useMessages()

  useEffect(() => {
    showChat && scrollBottom.current && scrollBottom.current.scrollIntoView()
  }, [showChat])

  return (
    <section className="messages">
      <div className="messages-wrapper">
        {messages?.map((message: Message) => (
          <Message
            messageText={message.text}
            messageCreatedAt={formatCreatedAtDate(message.createdAt)}
            side={defineMessageSide(message.author)}
            key={message.id}
          />
        ))}
      </div>
      <div className="scroll-bottom" ref={scrollBottom}></div>
    </section>
  )
}
