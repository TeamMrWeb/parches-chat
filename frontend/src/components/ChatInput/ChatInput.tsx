import { useSelector } from "react-redux"
import { useChatInput } from "./useChatInput"
import ChatPreviewImage from "../ChatPreviewImage/ChatPreviewImage"
import EmojisPicker from "../EmojisPicker/EmojisPicker"
import emojiIcon from "../../assets/icons/emoji-icon.svg"
import plusIcon from "../../assets/icons/plus-icon.svg"

export default function ChatInput() {
  const chat = useSelector((state: any) => state.chat)
  const { showEmojisPicker, setShowEmojisPicker, previewImage, image, setImage, value, setValue, submitMessage } = useChatInput(chat)

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
        {showEmojisPicker && <EmojisPicker setValue={setValue} />}
      </form>
    </section>
  )
}
