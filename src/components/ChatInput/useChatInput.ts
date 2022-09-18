import { useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createMessage } from "../../graphql/mutations"
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions"
import { setNewLoggedUserMessage } from "../../slicers/messagesSlice"

interface chat {
  id?: string
  name?: string
  messages?: Array<object>
  isGroup?: boolean
  secure?: boolean
  private?: boolean
  maxUsers?: number
  ownerId?: any
  admins?: Array<object>
  users?: Array<object>
  createdAt?: Date
  updatedAt?: Date
}

export const useChatInput = (chat: chat) => {
  const [value, setValue] = useState("")
  const [image, setImage] = useState("")
  const [showEmojisPicker, setShowEmojisPicker] = useState(false)
  const { lazyQueryMethod: createNewMessage } = useFetchingMethod(createMessage, setNewLoggedUserMessage)
  const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION)

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

  useEffect(() => {
    console.log("SOYOGAY", data)
  }, [loading])

  const submitMessage = (event: any) => {
    event.preventDefault()
    const message = value
    const chatId = chat.id
    createNewMessage({ variables: { chatId: chatId, text: message } })
  }

  return { showEmojisPicker, setShowEmojisPicker, previewImage, image, setImage, value, setValue, submitMessage }
}
