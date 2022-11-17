import { useContext } from "react"
import { createContext, useState } from "react"

interface ShowChatIndexWrapperContext {
  showChatIndexWrapper: boolean
  setShowChatIndexWrapper?: (value: boolean) => void
}

const ShowChatIndexWrapperContext = createContext<ShowChatIndexWrapperContext>({
  showChatIndexWrapper: true
})

const showChatIndexWrapperProvider = ({ children }: { children: React.ReactNode }) => {
  const [showChatIndexWrapper, setShowChatIndexWrapper] = useState(true)
  return (
    <ShowChatIndexWrapperContext.Provider value={{ showChatIndexWrapper, setShowChatIndexWrapper }}>
      {children}
    </ShowChatIndexWrapperContext.Provider>
  )
}

const useShowChatIndexWrapperContext = () => useContext(ShowChatIndexWrapperContext)

export { showChatIndexWrapperProvider, useShowChatIndexWrapperContext }
