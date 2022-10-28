import { useState } from "react"

export const useSwipe = (chatContainer: React.RefObject<HTMLDivElement>) => {
  const [touchStart, setTouchStart] = useState<null | number>(null)
  const [touchEnd, setTouchEnd] = useState<null | number>(null)
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
    if (isLeftSwipe && chatContainer.current)
      chatContainer.current.className = "chat-container expanded"
    if (isRightSwipe && chatContainer.current) chatContainer.current.className = "chat-container"
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
