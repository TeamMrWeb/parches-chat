import { useState } from "react"
import EmojisPicker from "../EmojisPicker/EmojisPicker"
import emojiIcon from "../../assets/icons/emoji-icon.svg"
import plusIcon from "../../assets/icons/plus-icon.svg"
import ChatPreviewImage from "../ChatPreviewImage/ChatPreviewImage"

export default function ChatInput() {
  const [image, setImage] = useState("")

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

  const cosoImagen = (imageRoute:any) =>{
    const route = URL.createObjectURL(imageRoute) as any
    setImage(route)
    // const data = new FormData() as any
    // data.append("file",  imageRoute) 
    // console.log(data)
  } 

  return (
    <section className="chat-input">
      {image && <ChatPreviewImage image={image} setImage={setImage}/>}
      <div className="chat-input-wrapper">
        
        <label htmlFor="image"><img className="chat-input__tool" src={plusIcon} alt="Adjuntar Imágen" /></label>
        <input className="chat-input__tool--upload" type="file" onChange={e =>{e.target.files && cosoImagen(e.target.files[0])}} id="image"/>
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
