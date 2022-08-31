import friendImage from "../../assets/icons/friend-image.svg"
export default function Friends() {
  return (
    <section className="friends">
      <h3 className="friends__title">Amigos</h3>
      <ul className="friends-list">
        <li className="friend">
          <img className="friend__image" src={friendImage} alt="Imagén de $friend" />
          <span className="friend__username">erickjq10x</span>
        </li>
        <li className="friend">
          <img className="friend__image" src={friendImage} alt="Imagén de $friend" />
          <span className="friend__username">thequitin</span>
        </li>
        <li className="friend">
          <img className="friend__image" src={friendImage} alt="Imagén de $friend" />
          <span className="friend__username">villa Madero</span>
        </li>
      </ul>
    </section>
  )
}
