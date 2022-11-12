import MembersList from "../MembersList/MembersList"
import { useGroupMembers } from "./useGroupMembers"

interface MembersStatus {
  0: string
  1: string
  2: string
  3: string
}

const membersStatus: MembersStatus = {
  "0": "Activos",
  "1": "Ausentes",
  "2": "No molestar",
  "3": "Inactivos"
}

export default function GroupMembers({
  groupMembersElement
}: {
  groupMembersElement: React.RefObject<HTMLDivElement>
}) {
  const { statusList, membersOfStatus } = useGroupMembers()

  return (
    <section className="group-members" ref={groupMembersElement}>
      <ul className="status-list">
        {statusList.map((status: any) => (
          <li key={status} className="status">
            <h3 className="status__title">{membersStatus[status as keyof MembersStatus]}</h3>
            <MembersList members={membersOfStatus(status)} />
          </li>
        ))}
      </ul>
    </section>
  )
}
