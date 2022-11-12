import { useState } from "react"

export const useSwipe = (element: React.RefObject<HTMLDivElement>) => {
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
    const groupMembersElement = document.querySelector(".group-members")
    const chatIndexWrapperElement = document.querySelector(".chat-index-wrapper")
    const chatContainerElement = document.querySelector(".chat-container")
    const chatIndexWrapperExpanded = chatIndexWrapperElement?.classList[1] === "expanded"
    const groupMembersExpanded = groupMembersElement?.classList[1] === "expanded"

    if (!element.current) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      if (chatIndexWrapperExpanded && !groupMembersExpanded) {
        chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} disabled`
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} expanded`
      } else if (!chatIndexWrapperExpanded && !groupMembersExpanded) {
        groupMembersElement?.classList.add("expanded")
        chatContainerElement?.classList.add("disabled")
      }
    }
    if (isRightSwipe) {
      if (!chatIndexWrapperExpanded && !groupMembersExpanded) {
        chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} expanded`
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} disabled`
      } else if (groupMembersExpanded && !chatIndexWrapperExpanded) {
        groupMembersElement!.className = groupMembersElement.classList[0]
        chatContainerElement!.className = `${chatContainerElement!.classList[0]} ${
          chatContainerElement!.classList[1]
        }`
      }
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
