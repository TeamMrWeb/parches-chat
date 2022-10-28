import InfiniteScroll from "react-infinite-scroll-component"
import { Oval } from "react-loader-spinner"
import { MessageProps } from "../../ts/interfaces"
import { useMessages } from "./useMessages"
import Message from "../Message/Message"

export default function Messages({
  scrollBottom
}: {
  scrollBottom: React.RefObject<HTMLDivElement>
}) {
  const { messages, defineMessageSide, formatCreatedAtDate, refetchChatMessages, hasMore } =
    useMessages()

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
        loader={
          <Oval
            height={30}
            width={30}
            color="#dd4ec6"
            wrapperStyle={{}}
            wrapperClass="oval-loader"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#8d4fc9"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        }
        inverse={true}
        scrollableTarget="scrollableDiv"
        className="messages-wrapper"
      >
        {messages?.map((message: MessageProps) => (
          <Message
            messageText={message.text!}
            messageCreatedAt={formatCreatedAtDate(message.createdAt!)}
            side={defineMessageSide(message.author)}
            key={message.id}
          />
        ))}
      </InfiniteScroll>
      <div className="scroll-bottom" ref={scrollBottom}></div>
    </section>
  )
}
