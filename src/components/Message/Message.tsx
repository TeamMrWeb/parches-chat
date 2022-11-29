export default function Message({
  messageId,
  messageText,
  messageImage,
  messageCreatedAt,
  side
}: {
  messageId: string
  messageText: string
  messageImage: { public_id: string; secure_url: string }
  messageCreatedAt: string
  side: string
}) {
  return (
    <div className={`message-container ${side === "right" ? " right" : " left"}`} id={messageId}>
      <div className="message">
        <div className="image-container">
          {messageImage.secure_url ? (
            <img className="message__image" src={messageImage.secure_url} alt="Imágen" />
          ) : null}
        </div>
        <div className="message-wrapper">
          <span className="message__text">{messageText}</span>
          <span className="message__hour">{messageCreatedAt}</span>
        </div>
      </div>
    </div>
  )
}
