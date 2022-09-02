import groupImage from "../../assets/icons/group-image.svg"

export default function Group({ image, key }: { image: string; key: number }) {
  return (
    <li className="group" key={key}>
      <img className="group__image" src={groupImage} alt="Imágen de grupo" />
    </li>
  )
}
