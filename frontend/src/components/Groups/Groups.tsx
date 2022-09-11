import Group from "../Group/Group"
import { useGroups } from "./useGroups"

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
      <ul className="groups-list">
        {fakeGroups.map(group => (
          <Group image={group.image} key={group.id} />
        ))}
      </ul>
    </section>
  )
}
