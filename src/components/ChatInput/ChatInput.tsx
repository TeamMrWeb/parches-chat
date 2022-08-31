import plusIcon from "../../assets/icons/plus-icon.svg"
import emojiIcon from "../../assets/icons/emoji-icon.svg"

export default function ChatInput() {
  return (
    <section className="chat-input">
      <img className="chat-input__insert-image" src={plusIcon} alt="Adjuntar Imágen" />
      <input className="chat-input__input" type="text" placeholder="Enviar mensaje a erickjq10x" />
      <img className="chat-input__emoji-image" src={emojiIcon} alt="Enviar emoji" />
    </section>
  )
}
