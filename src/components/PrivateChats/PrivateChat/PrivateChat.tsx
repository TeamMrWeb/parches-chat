import { usePrivateChat } from "./usePrivateChat"
import userDefaultIcon from "../../../assets/icons/user-default-icon.svg"

export default function PrivateChat({
  avatar,
  name,
  status,
  setFirstAccess,
  id
}: {
  avatar: string
  name: string
  status: number
  setFirstAccess: (firstAccess: boolean) => void
  id: string
}) {
  const { setShowChat, getChatById, defineChatActive, borderColors, lastMessage } = usePrivateChat({
    id
  })

  return (
    <li
      className={defineChatActive(id)}
      onClick={() => {
        setFirstAccess(false), setShowChat && setShowChat(true), getChatById(id)
      }}
    >
      <button className="button-wrapper">
        <img
          className="loggedUser-chat__avatar"
          src={avatar ? avatar : userDefaultIcon}
          alt={`Avatar de ${name}`}
          style={{ borderColor: borderColors[status] }}
        />
        <div className="chat-info">
          <span className="loggedUser-chat__username">{name}</span>
          <span className="chat-info__last-message">
            {lastMessage && lastMessage.chat.messages[0]?.text}
          </span>
        </div>
      </button>
    </li>
  )
}
