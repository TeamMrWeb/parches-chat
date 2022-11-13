import { useContext } from "react"
import { createContext, useState } from "react"

interface showChatInfoSidebarContext {
  showChatInfoSidebar: boolean
  setShowChatInfoSidebar?: (value: boolean) => void
}

const ShowChatInfoSIdebarContext = createContext<showChatInfoSidebarContext>({
  showChatInfoSidebar: false
})

const ShowChatInfoSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showChatInfoSidebar, setShowChatInfoSidebar] = useState(false)
  return (
    <ShowChatInfoSIdebarContext.Provider value={{ showChatInfoSidebar, setShowChatInfoSidebar }}>
      {children}
    </ShowChatInfoSIdebarContext.Provider>
  )
}

const useShowChatInfoSidebarContext = () => useContext(ShowChatInfoSIdebarContext)

export { ShowChatInfoSidebarProvider, useShowChatInfoSidebarContext }
