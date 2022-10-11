import { useGroups } from "./useGroups"
import GoHome from "../GoHome/GoHome"
import Group from "../Group/Group"

export default function Groups({ getChatById }: { getChatById: (chatId: string) => void }) {
  const { groups } = useGroups()

  return (
    <section className="groups">
      <GoHome />
      <ul className="groups-list">
        {groups?.map((group: any) => (
          <Group id={group.id} image={group.image} key={group.id} getChatById={getChatById} />
        ))}
      </ul>
    </section>
  )
}
