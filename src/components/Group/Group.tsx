import groupImage from "../../assets/icons/group-image.svg"

export default function Group({ image }: { image: string }) {
  //reemplazar groupImage por image prop
  return (
    <li className="group">
      <img className="group__image" src={groupImage} alt="Imágen de grupo" />
    </li>
  )
}
