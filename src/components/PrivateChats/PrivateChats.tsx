import { usePrivateChats } from "./usePrivateChats"
import { PrivateChat } from ".."
import plusIcon from "../../assets/icons/plus-icon.svg"
import { ChatProps } from "../../ts/interfaces"

export default function PrivateChats({
  firstAccess,
  setFirstAccess,
  showAddFriend,
  setShowAddFriend
}: {
  firstAccess: boolean
  setFirstAccess: (firstAccess: boolean) => void
  showAddFriend: boolean
  setShowAddFriend: (showAddFriend: boolean) => void
}) {
  const { chats, defineChatName } = usePrivateChats()

  return (
    <section className={`chats ${firstAccess && "extended"}`}>
      <h3 className="chats__title">Chats</h3>
      <ul className="chats-list">
        {chats.map((chat: ChatProps) => (
          <PrivateChat
            avatar={chat.avatar}
            name={defineChatName(chat.users)}
            status={chat.status}
            key={chat.id}
            id={chat.id!}
            setFirstAccess={setFirstAccess}
          />
        ))}
      </ul>
      <div className="add-friend" onClick={() => setShowAddFriend(!showAddFriend)}>
        <div className="add-friend-wrapper">
          <img className="add-friend__icon" src={plusIcon} alt="Ícono de agregar amigo" />
        </div>
        <span className="add-friend__text">Agregar amigo</span>
      </div>
    </section>
  )
}
