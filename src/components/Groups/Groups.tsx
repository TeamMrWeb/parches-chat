import { useGroups } from "./useGroups"
import { GroupProps } from "../../ts/interfaces"
import GoHome from "../GoHome/GoHome"
import Group from "../Group/Group"

export default function Groups() {
  const { groups } = useGroups()

  return (
    <section className="groups">
      <GoHome />
      <ul className="groups-list">
        {groups?.map((group: GroupProps) => (
          <Group id={group.id} image={group.image} key={group.id} />
        ))}
      </ul>
    </section>
  )
}
