import { useChats } from "./useChats"
import Chat from "./Chat/Chat"

export default function Chats({
  firstAccess,
  setFirstAccess,
  getChatById
}: {
  firstAccess: boolean
  setFirstAccess: any
  getChatById: (chatId: string) => void
}) {
  const { chats, defineChatName } = useChats()

  return (
    <section className={`chats ${firstAccess && "extended"}`}>
      <h3 className="chats__title">Chats</h3>
      <ul className="chats-list">
        {chats.map((chat: any) => (
          <Chat
            avatar={chat.avatar}
            name={defineChatName(chat.users)}
            status={chat.status}
            key={chat.id}
            id={chat.id}
            setFirstAccess={setFirstAccess}
            getChatById={getChatById}
          />
        ))}
      </ul>
    </section>
  )
}
