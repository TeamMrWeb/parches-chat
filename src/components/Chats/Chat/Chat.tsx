import { useShowChat } from "../../../contexts/ShowChatContext"

const borderColors = ["green", "orange", "red", "gray"]

export default function Friend({
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

  return (
    <li
      className="userlogged-chat"
      onClick={() => {
        setFirstAccess(false), setShowChat && setShowChat(true), getChatById(id)
      }}
    >
      <img className="userlogged-chat__image" src={avatar} alt={`Imagén de ${name}`} style={{ borderColor: borderColors[status] }} />
      <span className="userlogged-chat__username">{name}</span>
    </li>
  )
}
