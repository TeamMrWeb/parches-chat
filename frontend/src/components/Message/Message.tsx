export default function Message({ messageText, messageHour, side }: { messageText: string; messageHour: string; side: string }) {
  return (
    <div className={side === "right" ? "message-container right" : "message-container left"}>
      <div className="message">
        <span className="message__text">{messageText}</span>
        <span className="message__hour">{messageHour}</span>
      </div>
    </div>
  )
}
