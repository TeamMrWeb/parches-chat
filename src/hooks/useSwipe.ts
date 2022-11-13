import { useState } from "react"
import { useShowChatInfoSidebarContext } from "../contexts/ShowChatInfoSIdebarContext"

export const useSwipe = (element: React.RefObject<HTMLDivElement>) => {
  const [touchStart, setTouchStart] = useState<null | number>(null)
  const [touchEnd, setTouchEnd] = useState<null | number>(null)
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const chatIndexWrapperElement = document.querySelector(".chat-index-wrapper")
    const chatContainerElement = document.querySelector(".chat-container")
    const chatIndexWrapperExpanded = chatIndexWrapperElement?.classList[1] === "expanded"

    if (!element.current) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      if (chatIndexWrapperExpanded && !showChatInfoSidebar) {
        chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} disabled`
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} expanded`
      } else if (!chatIndexWrapperExpanded && !showChatInfoSidebar) {
        setShowChatInfoSidebar && setShowChatInfoSidebar(true)
        chatContainerElement?.classList.add("disabled")
        chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} disabled`
      }
    }
    if (isRightSwipe) {
      if (!chatIndexWrapperExpanded && !showChatInfoSidebar) {
        chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} expanded`
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} disabled`
      } else if (showChatInfoSidebar && !chatIndexWrapperExpanded) {
        setShowChatInfoSidebar && setShowChatInfoSidebar(false)
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} expanded`
      }
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
