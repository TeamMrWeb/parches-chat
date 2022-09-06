import { useState } from "react"
import EmojisPicker from "../EmojisPicker/EmojisPicker"
import emojiIcon from "../../assets/icons/emoji-icon.svg"
import plusIcon from "../../assets/icons/plus-icon.svg"

export default function ChatInput() {
  const [value, setValue] = useState("")
  const [showEmojisPicker, setShowEmojisPicker] = useState(false)

  window.onclick = (event: any) => {
    if (
      showEmojisPicker &&
      !document.getElementsByClassName("emoji-picker-react")[0].contains(event.target) &&
      event.target.className !== "chat-input__tool chat-input__tool--emoji-picker"
    )
      setShowEmojisPicker(false)
  }

  return (
    <section className="chat-input">
      <div className="chat-input-wrapper">
        <img className="chat-input__tool" src={plusIcon} alt="Adjuntar Imágen" />
        <input
          className="chat-input__input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setShowEmojisPicker(false)}
          type="text"
          placeholder="Enviar mensaje a erickjq10x"
          maxLength={2000}
        />
        <img
          className="chat-input__tool chat-input__tool--emoji-picker"
          src={emojiIcon}
          alt="Enviar emoji"
          onClick={() => setShowEmojisPicker(!showEmojisPicker)}
        />
        {showEmojisPicker && <EmojisPicker setValue={setValue} />}
      </div>
    </section>
  )
}
