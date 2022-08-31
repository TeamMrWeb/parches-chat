import friendImage from "../../assets/icons/friend-image.svg"
import dotsIcon from "../../assets/icons/dots-icon.svg"

export default function ChatInfoHeader() {
  return (
    <section className="chat-header header">
      <img className="header__image" src={friendImage} alt="Imagén de $friend" />
      <div className="right">
        <span className="header__username">erickjq10x</span>
        <img className="header__options" src={dotsIcon} alt="Opciones" />
      </div>
    </section>
  )
}
