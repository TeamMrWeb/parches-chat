import groupImage from "../../assets/icons/group-image.svg"

export default function Groups() {
  return (
    <section className="groups">
      <ul className="groups-list">
        <li className="group">
          <img className="group__image" src={groupImage} alt="Imágen de grupo" />
        </li>
        <li className="group">
          <img className="group__image" src={groupImage} alt="Imágen de grupo" />
        </li>
        <li className="group">
          <img className="group__image" src={groupImage} alt="Imágen de grupo" />
        </li>
      </ul>
    </section>
  )
}
