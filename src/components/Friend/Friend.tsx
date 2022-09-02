import friendImage from "../../assets/icons/friend-image.svg"

export default function Friend({ image, username, status, key }: { image: string; username: string; status: number; key: number }) {
  const defineBorderColor = () => {
    if (status === 1) return "green"
    if (status === 2) return "orange"
    if (status === 3) return "red"
    return "gray"
  }

  return (
    <li className="friend" key={key}>
      <img className="friend__image" src={friendImage} alt="Imagén de $friend" style={{ borderColor: defineBorderColor() }} />
      <span className="friend__username">{username}</span>
    </li>
  )
}
