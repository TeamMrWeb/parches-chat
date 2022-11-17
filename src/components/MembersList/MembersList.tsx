import { UserProps } from "../../ts/interfaces"

export default function MembersList({ members }: { members: UserProps[] }) {
  return (
    <ul className="members-list">
      {members.map(member => (
        <li key={member.id} className="member">
          <img
            className="member__avatar"
            src={member.avatar.secure_url}
            alt={`Avatar de ${member.username}`}
          />
          <span className="member__username">{member.username}</span>
        </li>
      ))}
    </ul>
  )
}
