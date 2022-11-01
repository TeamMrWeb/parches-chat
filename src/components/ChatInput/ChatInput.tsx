import { useSelector } from "react-redux"
import { useChatInput } from "./useChatInput"
import { EmojisPicker, ChatPreviewImage } from "../"
import { RootState } from "../../ts/interfaces"
import emojiIcon from "../../assets/icons/emoji-icon.svg"
import plusIcon from "../../assets/icons/plus-icon.svg"
import Emojis from "../Emojis/Emojis"

export default function ChatInput() {
  const chat = useSelector((state: RootState) => state.chat)
  const {
    showEmojisPicker,
    setShowEmojisPicker,
    previewImage,
    image,
    setImage,
    value,
    setValue,
    submitMessage
  } = useChatInput(chat)

  return (
    <section className="chat-input">
      {image && <ChatPreviewImage image={image} setImage={setImage} />}
      <form className="chat-input-wrapper" onSubmit={e => submitMessage(e)}>
        <label htmlFor="image">
          <img className="chat-input__tool" src={plusIcon} alt="Adjuntar Imágen" />
        </label>
        <input
          className="chat-input__tool--upload"
          type="file"
          onChange={e => {
            e.target.files && previewImage(e.target.files[0])
          }}
          id="image"
        />
        <input
          className="chat-input__input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setShowEmojisPicker(false)}
          autoFocus
          type="text"
          placeholder={`Enviar mensaje a ${chat.users && chat.users[0].username}`}
          maxLength={2000}
        />
        <img
          className="chat-input__tool chat-input__tool--emoji-picker"
          src={emojiIcon}
          alt="Enviar emoji"
          onClick={() => setShowEmojisPicker(!showEmojisPicker)}
        />
        {showEmojisPicker && <Emojis setValue={setValue} />}
      </form>
    </section>
  )
}
