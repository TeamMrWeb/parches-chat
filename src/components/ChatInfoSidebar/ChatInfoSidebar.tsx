import closeIcon from "../../assets/icons/close-icon.svg"
import { ChatProps } from "../../ts/interfaces"
import GroupMembers from "../GroupMembers/GroupMembers"
import { useChatInfoSidebar } from "./useChatInfoSidebar"

export default function ChatInfoSidebar({ chat }: { chat: ChatProps }) {
  const { defineChatAvatar, defineChatName, closeChatInfoSidebar } = useChatInfoSidebar()

  return (
    <aside className="chat-info-sidebar">
      <header className="chat-info-sidebar-header">
        <img
          className="header__icon"
          src={closeIcon}
          alt="Cerrar más información"
          onClick={() => closeChatInfoSidebar()}
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
