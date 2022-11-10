import { useContext } from "react"
import { createContext, useState } from "react"

interface showSearchMessages {
  showSearchMessages: boolean
  setShowSearchMessages?: (value: boolean) => void
}

const ShowSearchMessagesContext = createContext<showSearchMessages>({ showSearchMessages: false })

const ShowSearchMessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSearchMessages, setShowSearchMessages] = useState(false)
  return (
    <ShowSearchMessagesContext.Provider value={{ showSearchMessages, setShowSearchMessages }}>
      {children}
    </ShowSearchMessagesContext.Provider>
  )
}

const useShowSearchMessages = () => useContext(ShowSearchMessagesContext)

export { ShowSearchMessagesProvider, useShowSearchMessages }
