export default function Message({ messageText, messageCreatedAt, side }: { messageText: string; messageCreatedAt: string; side: string }) {
  return (
    <div className={side === "right" ? "message-container right" : "message-container left"}>
      <div className="message">
        <span className="message__text">{messageText}</span>
        <span className="message__hour">{messageCreatedAt}</span>
      </div>
    </div>
  )
}
