import { useShowChat } from "../../../contexts/ShowChatContext"
import userDefaultIcon from "../../../assets/icons/user-default-icon.svg"
import { useSelector } from "react-redux"
const borderColors = ["green", "orange", "red", "gray"]
import { setChat } from "../../../slicers/chatSlice"
import { chatById } from "../../../graphql/queries"
import { useFetchingMethod } from "../../../apollo/useFetchingMethod"

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
  setFirstAccess: any
  id: string
}) {
  const { setShowChat } = useShowChat()
  const chat = useSelector((state: any) => state.chat)
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)

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
