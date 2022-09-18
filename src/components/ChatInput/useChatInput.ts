import { useState } from "react"

export const useChatInput = () => {
  const [image, setImage] = useState("")
  const [showEmojisPicker, setShowEmojisPicker] = useState(false)

  window.onclick = (event: any) => {
    if (
      showEmojisPicker &&
      !document.getElementsByClassName("emoji-picker-react")[0].contains(event.target) &&
      event.target.className !== "chat-input__tool chat-input__tool--emoji-picker"
    )
      setShowEmojisPicker(false)
  }

  const previewImage = (imageRoute: any) => {
    const route = URL.createObjectURL(imageRoute)
    setImage(route)
  }

  return { showEmojisPicker, setShowEmojisPicker, previewImage, image, setImage }
}
