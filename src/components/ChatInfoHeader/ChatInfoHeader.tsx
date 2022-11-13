import { useShowSearchMessages } from "../../contexts/ShowSearchMessagesContext"
import { useChatInfoHeader } from "./useChatInfoHeader"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"
import searchIcon from "../../assets/icons/search-icon.svg"
import backIcon from "../../assets/icons/back-icon.svg"
import SearchMessages from "../SearchMessages/SearchMessages"

export default function ChatInfoHeader() {
  const { chatData, expandChatIndexWrapper } = useChatInfoHeader()
  const { showSearchMessages, setShowSearchMessages } = useShowSearchMessages()

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
        <button
          className="search-messages-tool"
          onClick={() => setShowSearchMessages!(!showSearchMessages)}
        >
          <img className="search-messages__icon" src={searchIcon} alt="Buscar mensajes" />
        </button>
      </div>
      {showSearchMessages ? <SearchMessages /> : null}
    </section>
  )
}
