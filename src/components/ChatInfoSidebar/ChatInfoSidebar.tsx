import closeIcon from "../../assets/icons/close-icon.svg"
import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import { ChatProps } from "../../ts/interfaces"
import GroupMembers from "../GroupMembers/GroupMembers"
import { useChatInfoSidebar } from "./useChatInfoSidebar"

export default function ChatInfoSidebar({ chat }: { chat: ChatProps }) {
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()
  const { defineChatAvatar, defineChatName } = useChatInfoSidebar()

  return (
    <aside className="chat-info-sidebar">
      <header className="chat-info-sidebar-header">
        <img
          className="header__icon"
          src={closeIcon}
          alt="Cerrar más información"
          onClick={() => setShowChatInfoSidebar && setShowChatInfoSidebar(!showChatInfoSidebar)}
        />
        <span className="header__title">Más información</span>
      </header>
      <div className="avatar-section">
        <img className="avatar" src={defineChatAvatar(chat)} alt="Avatar" />
        <h3 className="chat-name">{defineChatName(chat)}</h3>
      </div>
      {chat.isGroup ? <GroupMembers /> : null}
    </aside>
  )
}
