import friendImage from "../../assets/icons/friend-image.svg"

export default function Friend({ image, username, status }: { image: string; username: string; status: number }) {
  const defineBorderColor = () => {
    if (status === 1) return "green"
    if (status === 2) return "orange"
    if (status === 3) return "red"
    return "gray"
  }

  // la imagen friendImage de arriba solo de prueba, cuando esten los datos reales hay que sacarlo

  return (
    <li className="friend">
      <img className="friend__image" src={friendImage} alt={`Imagén de ${username}`} style={{ borderColor: defineBorderColor() }} />
      <span className="friend__username">{username}</span>
    </li>
  )
}
