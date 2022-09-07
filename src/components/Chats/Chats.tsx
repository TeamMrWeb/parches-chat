import { useChats } from "./useChats"
import Chat from "./Chat/Chat"

export default function Chats({ firstAccess, setFirstAccess }: { firstAccess: boolean; setFirstAccess: any }) {
  const { chats } = useChats()

  return (
    <section className={`chats ${firstAccess && "extended"}`}>
      <h3 className="chats__title">Chats</h3>
      <ul className="chats-list">
        {chats.map((chat: any) => (
          <Chat image={chat.image} name={chat.name} status={chat.status} key={chat.id} setFirstAccess={setFirstAccess} />
        ))}
      </ul>
    </section>
  )
}
