import { useShowChat } from "../../../contexts/ShowChatContext"
import friendImage from "../../../assets/icons/friend-image.svg"

const borderColors = ["green", "orange", "red", "gray"]

export default function Friend({
  image,
  name,
  status,
  setFirstAccess
}: {
  image: string
  name: string
  status: number
  setFirstAccess: any
}) {
  const { setShowChat } = useShowChat()

  // la imagen friendImage de arriba solo de prueba, cuando esten los datos reales hay que sacarlo

  return (
    <li
      className="userlogged-chat"
      onClick={() => {
        setFirstAccess(false), setShowChat && setShowChat(true)
      }}
    >
      <img className="userlogged-chat__image" src={friendImage} alt={`Imagén de ${name}`} style={{ borderColor: borderColors[status] }} />
      <span className="userlogged-chat__username">{name}</span>
    </li>
  )
}
