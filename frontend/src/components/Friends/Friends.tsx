import Friend from "../Friend/Friend"
import { useFriends } from "./useFriends"

export default function Friends() {
  const { friends } = useFriends()

  const fakeFriends = [
    //amigos de prueba
    { id: 1, username: "erickjq10x", image: "nohay", status: 1 },
    { id: 2, username: "thequitin", image: "nohay", status: 2 },
    { id: 3, username: "le01q", image: "nohay", status: 3 },
    { id: 4, username: "xyzw", image: "nohay", status: 4 },
    { id: 5, username: "skyrummerz", image: "nohay", status: 1 }
  ]

  return (
    <section className="friends">
      <h3 className="friends__title">Amigos</h3>
      <ul className="friends-list">
        {fakeFriends.map(friend => (
          <Friend image={friend.image} username={friend.username} status={friend.status} key={friend.id} />
        ))}
      </ul>
    </section>
  )
}
