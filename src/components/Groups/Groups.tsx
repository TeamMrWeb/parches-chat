import { useGroups } from "./useGroups"
import GoHome from "../GoHome/GoHome"
import Group from "../Group/Group"

export default function Groups() {
  const { groups } = useGroups()

  const fakeGroups = [
    { id: 1, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 2, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 3, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 4, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" }
  ]

  return (
    <section className="groups">
      <GoHome />
      <ul className="groups-list">
        {fakeGroups.map(group => (
          <Group image={group.image} key={group.id} />
        ))}
      </ul>
    </section>
  )
}
