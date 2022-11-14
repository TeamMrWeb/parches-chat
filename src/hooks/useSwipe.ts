import { useState } from "react"
import { useShowChatIndexWrapperContext } from "../contexts/showChatIndexWrapperContext"
import { useShowChatInfoSidebarContext } from "../contexts/ShowChatInfoSIdebarContext"
import { useShowChatContainerContext } from "../contexts/ShowChatContainerContext"

export const useSwipe = () => {
  const [touchStart, setTouchStart] = useState<null | number>(null)
  const [touchEnd, setTouchEnd] = useState<null | number>(null)
  const { showChatIndexWrapper, setShowChatIndexWrapper } = useShowChatIndexWrapperContext()
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()
  const { setShowChatContainer } = useShowChatContainerContext()

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (!setShowChatIndexWrapper || !setShowChatContainer || !setShowChatInfoSidebar) return
    if (isLeftSwipe) {
      if (showChatIndexWrapper && !showChatInfoSidebar) {
        setShowChatIndexWrapper(false)
        setShowChatContainer(true)
      } else if (!showChatIndexWrapper && !showChatInfoSidebar) {
        setShowChatInfoSidebar(true)
        setShowChatContainer(false)
        setShowChatIndexWrapper(false)
      }
    }
    if (isRightSwipe) {
      if (!showChatIndexWrapper && !showChatInfoSidebar) {
        setShowChatIndexWrapper(true)
        setShowChatContainer(false)
      } else if (showChatInfoSidebar && !showChatIndexWrapper) {
        setShowChatInfoSidebar(false)
        setShowChatContainer(true)
      }
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
