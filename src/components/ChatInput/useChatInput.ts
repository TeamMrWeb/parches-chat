import { FormEvent, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createMessage } from "../../graphql/mutations"
import { ChatProps } from "../../ts/interfaces"

export const useChatInput = (chat: ChatProps) => {
  const [value, setValue] = useState("")
  const [image, setImage] = useState("")
  const [showEmojisPicker, setShowEmojisPicker] = useState(false)
  const { lazyQueryMethod: createNewMessage } = useFetchingMethod(createMessage)

  window.onclick = (event: MouseEvent) => {
    if (
      showEmojisPicker &&
      !document.getElementsByClassName("emoji-picker-react")[0].contains(event.target as Element) &&
      (event.target as Element).className !== "chat-input__tool chat-input__tool--emoji-picker"
    )
      setShowEmojisPicker(false)
  }

  const previewImage = (imageRoute: File) => {
    const route = URL.createObjectURL(imageRoute)
    setImage(route)
  }

  const submitMessage = (event: FormEvent) => {
    event.preventDefault()
    const message = value
    const chatId = chat.id
    createNewMessage({ variables: { chatId: chatId, text: message } })
    setValue("")
  }

  return { showEmojisPicker, setShowEmojisPicker, previewImage, image, setImage, value, setValue, submitMessage }
}
