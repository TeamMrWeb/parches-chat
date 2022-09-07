import Chat from "./Chat/Chat"
import { useChats } from "./useChats"

export default function Chats({ firstAccess, setFirstAccess }: { firstAccess: boolean; setFirstAccess: any }) {
  const { chats } = useChats()

  const fakeFriends = [
    //amigos de prueba
    { id: 1, username: "erickjq10x", image: "nohay", status: 1 },
    { id: 2, username: "thequitin", image: "nohay", status: 2 },
    { id: 3, username: "le01q", image: "nohay", status: 3 },
    { id: 4, username: "xyzw", image: "nohay", status: 4 },
    { id: 5, username: "skyrummerz", image: "nohay", status: 1 }
  ]

  return (
    <section className={`chats ${firstAccess && "extended"}`}>
      <h3 className="chats__title">Amigos</h3>
      <ul className="chats-list">
        {fakeFriends.map(friend => (
          <Chat image={friend.image} username={friend.username} status={friend.status} key={friend.id} setFirstAccess={setFirstAccess} />
        ))}
      </ul>
    </section>
  )
}
