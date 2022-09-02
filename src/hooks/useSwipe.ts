import { useState } from "react"

export const useSwipe = (chatContainer: any) => {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const onTouchStart = (e: any) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    console.log({ isLeftSwipe, isRightSwipe })
    if (isLeftSwipe) chatContainer.current.className = "chat-container expanded"
    if (isRightSwipe) chatContainer.current.className = "chat-container"
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
