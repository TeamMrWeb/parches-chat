import { useShowChat } from "../../../contexts/ShowChatContext"
import userDefaultIcon from "../../../assets/icons/user-default-icon.svg"
import { useSelector } from "react-redux"
const borderColors = ["green", "orange", "red", "gray"]

export default function Chat({
  avatar,
  name,
  status,
  setFirstAccess,
  id,
  getChatById
}: {
  avatar: string
  name: string
  status: number
  setFirstAccess: any
  id: string
  getChatById: (chatId: string) => void
}) {
  const { setShowChat } = useShowChat()
  const chat = useSelector((state: any) => state.chat)

  const defineChatActive = () => {
    if (chat.id === id) return "loggedUser-chat active"
    return "loggedUser-chat"
  }

  return (
    <li
      className={defineChatActive()}
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
        <span className="loggedUser-chat__username">{name}</span>
      </button>
    </li>
  )
}
