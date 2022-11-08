import { useGroups } from "./useGroups"
import { GroupProps } from "../../ts/interfaces"
import GoHome from "../GoHome/GoHome"
import Group from "../Group/Group"
import plusIcon from "../../assets/icons/plus-icon.svg"

export default function Groups({
  setShowAddNewGroup
}: {
  setShowAddNewGroup: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { groups } = useGroups()

  return (
    <section className="groups">
      <GoHome />
      <ul className="groups-list">
        {groups?.map((group: GroupProps) => (
          <Group id={group.id} image={group.avatar.secure_url} key={group.id} />
        ))}
      </ul>
      <button className="add-group" onClick={() => setShowAddNewGroup(true)}>
        <img className="add-group__icon" src={plusIcon} alt="Añadir grupo" />
      </button>
    </section>
  )
}
