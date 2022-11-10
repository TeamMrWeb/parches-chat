import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { MessageProps, RootState } from "../../ts/interfaces"

interface Coincidence {
  index: number
  direction: string
}

export const useSearchMessages = () => {
  const [message, setMessage] = useState("")
  const [coincidence, setCoincidence] = useState<Coincidence>({ index: 0, direction: "up" })
  const [results, setResults] = useState<MessageProps[]>([])
  const messages = useSelector((state: RootState) => state.messages)

  useEffect(() => {
    if (message.length === 0) return setMessage("")
    const timer = setTimeout(async () => {
      const results = messages.filter((messageToFind: MessageProps) =>
        messageToFind.text!.includes(message)
      )
      setResults(results)
      const messageFound = results[coincidence.index]
      activeElement(messageFound)
    }, 1000)
    return () => clearTimeout(timer)
  }, [message])

  useEffect(() => {
    if (results.length <= 0) return
    const messageFound = results[coincidence.index]
    const messageElement = activeElement(messageFound)
    let messageToRemove
    if (coincidence.direction === "up") messageToRemove = results[coincidence.index - 1]
    else messageToRemove = results[coincidence.index + 1]
    messageElement && desactiveElement(messageToRemove)
  }, [coincidence])

  const activeElement = (messageFound: MessageProps) => {
    const messageElement = document.getElementById(`${messageFound.id}`)
    messageElement && messageElement.classList.add("active")
    setTimeout(() => {
      messageElement && messageElement.classList.remove("active")
    }, 2900)
    return messageElement
  }

  const desactiveElement = (message: MessageProps) => {
    const messageElement = document.getElementById(`${message.id}`)
    messageElement && messageElement.classList.remove("active")
  }

  return { setMessage, setCoincidence }
}
