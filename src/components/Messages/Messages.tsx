import InfiniteScroll from "react-infinite-scroll-component"
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
  const { messages, defineMessageSide, formatCreatedAtDate, scrollBottom, refetchChatMessages, chat, hasMore } = useMessages()
  console.log(chat.id)

  return (
    <section
      className="messages"
      id="scrollableDiv"
      style={{
        display: "flex",
        flexDirection: "column-reverse"
      }}
    >
      <InfiniteScroll
        dataLength={messages?.length}
        next={() => refetchChatMessages(messages.length)}
        hasMore={hasMore}
        loader={<span style={{ color: "white" }}>Loading...</span>}
        inverse={true}
        scrollableTarget="scrollableDiv"
        className="messages-wrapper"
        endMessage={
          <p style={{ textAlign: "center", color: "white" }}>
            <b>Ups... Parece que has llegado al final</b>
          </p>
        }
      >
        {messages?.map((message: Message) => (
          <Message
            messageText={message.text}
            messageCreatedAt={formatCreatedAtDate(message.createdAt)}
            side={defineMessageSide(message.author)}
            key={message.id}
          />
        ))}
      </InfiniteScroll>
      <div className="scroll-bottom" ref={scrollBottom}></div>
    </section>
  )
}
