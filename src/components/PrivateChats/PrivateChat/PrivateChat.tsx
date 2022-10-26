import { useSelector } from "react-redux"
import { useShowChat } from "../../../contexts/ShowChatContext"
import { setChat } from "../../../slicers/chatSlice"
import { chatById } from "../../../graphql/queries"
import { useFetchingMethod } from "../../../apollo/useFetchingMethod"
import { RootState } from "../../../ts/interfaces"
import userDefaultIcon from "../../../assets/icons/user-default-icon.svg"

const borderColors = ["green", "orange", "red", "gray"]

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
  const { setShowChat } = useShowChat()
  const chat = useSelector((state: RootState) => state.chat)
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)

  const defineChatActive = () => (chat.id === id ? "loggedUser-chat active" : "loggedUser-chat")

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
