import { useContext } from "react"
import { createContext, useState } from "react"

interface showChatCOntext {
  showChat: boolean
  setShowChat?: (value: boolean) => void
}

const ShowChatContext = createContext<showChatCOntext>({ showChat: false })

const ShowChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [showChat, setShowChat] = useState(false)
  return (
    <ShowChatContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </ShowChatContext.Provider>
  )
}

const useShowChat = () => useContext(ShowChatContext)

export { ShowChatProvider, useShowChat }
