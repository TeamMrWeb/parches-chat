import friendImage from "../../assets/icons/friend-image.svg"
import dotsIcon from "../../assets/icons/dots-icon.svg"
import backIcon from "../../assets/icons/back-icon.svg"
import { useSwipe } from "../../hooks/useSwipe"
import { useChatInfoHeader } from "./useChatInfoHeader"

export default function ChatInfoHeader() {
  const { showChat, setShowChat } = useChatInfoHeader()

  return (
    <section className="chat-header header">
      <img className="header__back" src={backIcon} alt="Ícono de volver atrás" onClick={() => setShowChat(!showChat)} />
      <img className="header__image" src={friendImage} alt="Imagén de $friend" />
      <div className="right">
        <span className="header__username">erickjq10x</span>
        <img className="header__options" src={dotsIcon} alt="Opciones" />
      </div>
    </section>
  )
}
