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
      if (!messageFound) return
      setCoincidence({ index: 0, direction: "up" })
      activeElement(messageFound)
    }, 1000)
    return () => clearTimeout(timer)
  }, [message])

  useEffect(() => {
    if (results.length <= 0) return
    const messageFound = results[coincidence.index]
    if (!messageFound) return
    const messageElement = activeElement(messageFound)
    let messageToRemove
    if (coincidence.direction === "up") messageToRemove = results[coincidence.index - 1]
    else messageToRemove = results[coincidence.index + 1]
    messageElement && messageToRemove && desactiveElement(messageToRemove)
  }, [coincidence])

  const activeElement = (messageFound: MessageProps) => {
    const messageElement = document.getElementById(`${messageFound.id}`)
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth" })
      messageElement.classList.add("active")
    }
    setTimeout(() => {
      messageElement && messageElement.classList.remove("active")
    }, 2900)
    return messageElement
  }

  const desactiveElement = (message: MessageProps) => {
    const messageElement = document.getElementById(`${message.id}`)
    messageElement && messageElement.classList.remove("active")
  }

  const incrementCoincidence = () => {
    if (coincidence.index + 1 >= results.length) return
    setCoincidence(coincidence => {
      return { index: coincidence.index + 1, direction: "up" }
    })
  }

  const decrementCoincidence = () => {
    if (coincidence.index - 1 <= -1) return
    setCoincidence(coincidence => {
      return { index: coincidence.index - 1, direction: "down" }
    })
  }

  const coincidencesCount = () => {
    const currentCoindicence = coincidence.index
    const totalCoincidences = results.length
    if (totalCoincidences === 0) return null
    return `${currentCoindicence + 1} / ${totalCoincidences}`
  }

  return {
    setMessage,
    setCoincidence,
    coincidencesCount,
    incrementCoincidence,
    decrementCoincidence
  }
}
