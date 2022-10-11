import groupImage from "../../assets/icons/group-image.svg"

export default function Group({ id, image, getChatById }: { id: string; image: string; getChatById: (chatId: string) => void }) {
  return (
    <li className="group" onClick={() => getChatById(id)}>
      <img className="group__image" src={image} alt="Imágen de grupo" />
    </li>
  )
}
