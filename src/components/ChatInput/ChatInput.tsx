import plusIcon from "../../assets/icons/plus-icon.svg"
import emojiIcon from "../../assets/icons/emoji-icon.svg"

export default function ChatInput() {
  return (
    <section className="chat-input">
      <div className="chat-input-wrapper">
        <img className="chat-input__tool" src={plusIcon} alt="Adjuntar Imágen" />
        <input className="chat-input__input" type="text" placeholder="Enviar mensaje a erickjq10x" maxLength={2000} />
        <img className="chat-input__tool" src={emojiIcon} alt="Enviar emoji" />
      </div>
    </section>
  )
}
