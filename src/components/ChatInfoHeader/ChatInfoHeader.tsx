import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import { useShowSearchMessages } from "../../contexts/ShowSearchMessagesContext"
import { useChatInfoHeader } from "./useChatInfoHeader"
import SearchMessages from "../SearchMessages/SearchMessages"
import lateralColumnIcon from "../../assets/icons/lateral-column-icon.svg"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"
import searchIcon from "../../assets/icons/search-icon.svg"
import backIcon from "../../assets/icons/back-icon.svg"

export default function ChatInfoHeader() {
  const { chatData, expandChatIndexWrapper } = useChatInfoHeader()
  const { showSearchMessages, setShowSearchMessages } = useShowSearchMessages()
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()

  return (
    <section className="chat-header header">
      <img
        className="header__back"
        src={backIcon}
        alt="Ícono de volver atrás"
        onClick={() => expandChatIndexWrapper()}
      />
      <img
        className="header__image"
        src={chatData?.avatar ? chatData.avatar.secure_url : userDefaultIcon}
        alt="Imagén de $friend"
      />
      <div className="right">
        <span className="header__username">{chatData?.name}</span>
        <div className="tools">
          <button className="tool" onClick={() => setShowSearchMessages!(!showSearchMessages)}>
            <img className="tool__icon" src={searchIcon} alt="Buscar mensajes" />
          </button>
          <button className="tool" onClick={() => setShowChatInfoSidebar!(!showChatInfoSidebar)}>
            <img className="tool__icon" src={lateralColumnIcon} alt="Más información del chat" />
          </button>
        </div>
      </div>
      {showSearchMessages ? <SearchMessages /> : null}
    </section>
  )
}
