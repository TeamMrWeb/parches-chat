import { useShowChat } from "../../contexts/ShowChatContext"
import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"

export default function GoHome() {
  const { setShowChat } = useShowChat()

  return (
    <button className="go-home" onClick={() => setShowChat && setShowChat(true)}>
      <img className="go-home__image" src={parchesChatIcon} alt="Ícono de inicio" />
    </button>
  )
}
