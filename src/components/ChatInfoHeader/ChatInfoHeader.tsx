import { useShowSearchMessages } from "../../contexts/ShowSearchMessagesContext"
import { useChatInfoHeader } from "./useChatInfoHeader"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"
import searchIcon from "../../assets/icons/search-icon.svg"
import userGroupIcon from "../../assets/icons/user-group-icon.svg"
import backIcon from "../../assets/icons/back-icon.svg"
import SearchMessages from "../SearchMessages/SearchMessages"

export default function ChatInfoHeader() {
  const { chatData, expandChatIndexWrapper, toggleGroupMembers } = useChatInfoHeader()
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
        <div className="tools">
          <button className="tool" onClick={() => setShowSearchMessages!(!showSearchMessages)}>
            <img className="tool__icon" src={searchIcon} alt="Buscar mensajes" />
          </button>
          {chatData?.isGroup ? (
            <button className="tool" onClick={() => toggleGroupMembers()}>
              <img className="tool__icon" src={userGroupIcon} alt="Ver miembros del grupo" />
            </button>
          ) : null}
        </div>
      </div>
      {showSearchMessages ? <SearchMessages /> : null}
    </section>
  )
}
