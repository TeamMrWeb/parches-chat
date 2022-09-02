import Group from "../Group/Group"

export default function Groups() {
  const groups = [
    { id: 1, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 2, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 3, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" },
    { id: 4, name: "parches", messages: [{ text: "holatOdobien?" }, { text: "holatOdobien?" }], isGroup: true, image: "nohay" }
  ]

  return (
    <section className="groups">
      <ul className="groups-list">
        {groups.map(group => (
          <Group image={group.image} key={group.id} />
        ))}
      </ul>
    </section>
  )
}
