import { FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createMessage } from "../../graphql/mutations"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { ChatProps } from "../../ts/interfaces"

export const useChatInput = (chat: ChatProps) => {
  const [value, setValue] = useState("")
  const [image, setImage] = useState("")
  const [showEmojisPicker, setShowEmojisPicker] = useState(false)
  const { lazyQueryMethod: createNewMessage } = useFetchingMethod(createMessage)
  const [messageDelay, setMessageDelay] = useState(new Date().getSeconds())
  const [chatIsTimedOut, setChatIsTimedOut] = useState(false)
  const [canWrite, setCanWrite] = useState(true)
  const [messagesIn5s, setMessagesIn5s] = useState(0)
  const [chatMessageStarted, setChatMessageStarted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const timestamp = new Date().getSeconds()
    if (timestamp === messageDelay) setMessageDelay(timestamp)
  }, [messageDelay])

  window.onclick = (event: MouseEvent) => {
    if (
      showEmojisPicker &&
      !document.querySelector(".emojis-container")?.contains(event.target as Element) &&
      (event.target as Element).className !== "chat-input__tool chat-input__tool--emoji-picker"
    )
      setShowEmojisPicker(false)
  }

  const previewImage = (imageRoute: File) => {
    const route = URL.createObjectURL(imageRoute)
    setImage(route)
  }

  const protectFromFlood = () => {
    if (messagesIn5s > 6 && canWrite) {
      setCanWrite(false)
      setChatIsTimedOut(true)
      setTimeout(() => {
        setCanWrite(true)
        setChatIsTimedOut(false)
        setMessagesIn5s(0)
      }, 5000)
    } else if (canWrite) {
      setMessagesIn5s(messagesIn5s + 1)
      if (!chatMessageStarted) {
        setChatMessageStarted(true)
        setTimeout(() => {
          setChatMessageStarted(false)
          setMessagesIn5s(0)
        }, 5000)
      }
    }
  }

  const submitMessage = (event: FormEvent) => {
    event.preventDefault()
    const message = value
    if (message.length <= 0) return
    protectFromFlood()
    if (chatIsTimedOut) {
      return dispatch(
        createAlertMessage({
          title: `¡Ey!`,
          description: "Estas enviando mensajes muy rápido, espera un poco",
          type: "warning",
          visible: true,
          lifeTime: 5000
        })
      )
    }
    const chatId = chat.id
    createNewMessage({ variables: { chatId: chatId, text: message } })
    setValue("")
  }

  return {
    showEmojisPicker,
    setShowEmojisPicker,
    previewImage,
    image,
    setImage,
    value,
    setValue,
    submitMessage
  }
}
