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
        {messageImage?.secure_url ? (
          <div className="image-container">
            <img className="message__image" src={messageImage.secure_url} alt="Imágen" />
          </div>
        ) : null}
        <div className="message-wrapper">
          <span className="message__text">{messageText}</span>
          <span className="message__hour">{messageCreatedAt}</span>
        </div>
      </div>
    </div>
  )
}
