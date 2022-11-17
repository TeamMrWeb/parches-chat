export default function Message({
  messageId,
  messageText,
  messageCreatedAt,
  side
}: {
  messageId: string
  messageText: string
  messageCreatedAt: string
  side: string
}) {
  return (
    <div className={`message-container ${side === "right" ? " right" : " left"}`} id={messageId}>
      <div className="message">
        <span className="message__text">{messageText}</span>
        <span className="message__hour">{messageCreatedAt}</span>
      </div>
    </div>
  )
}
