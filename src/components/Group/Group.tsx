import groupImage from "../../assets/icons/group-image.svg"

export default function Group({ image }: { image: string }) {
  return (
    <li className="group">
      <img className="group__image" src={groupImage} alt="Imágen de grupo" />
    </li>
  )
}
