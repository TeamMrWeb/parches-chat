import { useShowChat } from "../../contexts/ShowChatContext"
import { useChatInfoHeader } from "./useChatInfoHeader"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"
import dotsIcon from "../../assets/icons/dots-icon.svg"
import backIcon from "../../assets/icons/back-icon.svg"

export default function ChatInfoHeader() {
  const { showChat, setShowChat } = useShowChat()
  const { chatData } = useChatInfoHeader()

  return (
    <section className="chat-header header">
      <img
        className="header__back"
        src={backIcon}
        alt="Ícono de volver atrás"
        onClick={() => setShowChat && setShowChat(!showChat)}
      />
      <img
        className="header__image"
        src={chatData?.avatar ? chatData.avatar.secure_url : userDefaultIcon}
        alt="Imagén de $friend"
      />
      <div className="right">
        <span className="header__username">{chatData?.name}</span>
        {/* <img className="header__options" src={dotsIcon} alt="Opciones" /> */}
      </div>
    </section>
  )
}
