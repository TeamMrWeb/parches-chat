import Chat from "../../components/Chat/Chat"
import Friends from "../../components/Friends/Friends"
import Groups from "../../components/Groups/Groups"

export default function ChatIndex() {
  return (
    <section className="chat-index">
      <Groups />
      <Friends />
      <Chat />
    </section>
  )
}
