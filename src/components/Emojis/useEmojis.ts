import { useEffect, useMemo, useState } from "react"
import emojis from "./emojis.json"
import basketballIcon from "../../assets/icons/basketball-icon.svg"
import personIcon from "../../assets/icons/person-icon.svg"
import trophyIcon from "../../assets/icons/trophy-icon.svg"
import iconsIcon from "../../assets/icons/icons-icon.svg"
import pizzaIcon from "../../assets/icons/pizza-icon.svg"
import planeIcon from "../../assets/icons/plane-icon.svg"
import faceIcon from "../../assets/icons/face-icon.svg"
import flagIcon from "../../assets/icons/flag-icon.svg"
import crowIcon from "../../assets/icons/crow-icon.svg"

interface EmojiProps {
  emoji: string
  name: string
  shortname: string
  unicode: string
  html: string
  category: string
  order: string
}

interface CategoriesIconProps {
  "People & Body": string
  "Smileys & Emotion": string
  Activities: string
  Symbols: string
  Objects: string
  "Animals & Nature": string
  "Travel & Places": string
  "Food & Drink": string
  Flags: string
}

const categoriesIcons = {
  "People & Body": personIcon,
  "Smileys & Emotion": faceIcon,
  Activities: basketballIcon,
  Symbols: iconsIcon,
  Objects: trophyIcon,
  "Animals & Nature": crowIcon,
  "Travel & Places": planeIcon,
  "Food & Drink": pizzaIcon,
  Flags: flagIcon
} as CategoriesIconProps

export const useEmojis = () => {
  const [hasMore, setHasMore] = useState(true)
  const [emojisList, setEmojisList] = useState<EmojiProps[]>([])
  const [emojisFromCategory, setEmojisFromCategory] = useState<EmojiProps[]>([])
  const [currentCategory, setCurrentCategory] = useState("")

  const emojisSortedByCategory = useMemo(
    () => emojis.sort((a, b) => a.category.localeCompare(b.category)),
    []
  )

  useEffect(() => {
    setEmojisList(
      getEmojis(emojisFromCategory.length >= 1 ? emojisFromCategory : emojisSortedByCategory, 0, 60)
    )
  }, [emojisFromCategory])

  const getEmojis = (from: EmojiProps[], start: number, end: number) => from.slice(start, end)

  const getMoreEmojis = (emojisListLength: number) => {
    let emojisToLoad: EmojiProps[]
    console.log(
      emojisListLength,
      emojisFromCategory.length >= 1 ? emojisFromCategory : emojisSortedByCategory
    )
    emojisToLoad = getEmojis(
      emojisFromCategory.length >= 1 ? emojisFromCategory : emojisSortedByCategory,
      emojisListLength,
      emojisListLength + 60
    )
    emojisToLoad.length >= 1
      ? setEmojisList((emojisList: EmojiProps[]) => [...emojisList, ...emojisToLoad])
      : setHasMore(false)
  }

  const defineCategoryIcon = (category: string) =>
    categoriesIcons[category as keyof CategoriesIconProps]

  const getEmojisCategories = () =>
    [
      ...new Set(emojisSortedByCategory.map(emoji => emoji.category.replace(/ *\([^)]*\) */g, "")))
    ].slice(1, 10)

  const getAllEmojis = () => setEmojisFromCategory([])

  /**
   * Gets the emoji value from a emoji object
   * @param emoji_object - The emoji object
   * @returns The emoji value
   */
  const getEmoji = (emoji_object: any) => emoji_object["emoji"]

  /**
   * Gets a emoji by shortname
   * @param shortname - The shortname of the emoji
   * @param only_object - If true, returns the emoji object, otherwise returns the emoji value
   * @returns The emoji object or the emoji value
   */
  const getEmojiByShortName = (shortName: string, only_object: Boolean = false) => {
    const emoji = emojis.find(emoji => emoji.shortname === shortName)
    return only_object ? emoji : getEmoji(emoji)
  }

  /**
   * Parses a string and replaces all shortnames with emojis values
   * @param text - The text to parse
   * @returns The parsed text
   */
  const parseText = (text: string) => {
    const regex = /:[a-zA-Z0-9_]+:/g
    const matches = text.match(regex)
    if (matches) {
      matches.forEach(match => {
        const emoji = getEmojiByShortName(match)
        text = text.replace(match, emoji)
      })
    }
    return text
  }

  /**
   * Gets emojis by category
   * @param category - The category of the emojis
   * @returns The emojis (list of emoji objects)
   */
  const getEmojisFromCategory = (category: string) => {
    const emojisListElement = document.querySelector(".emojis-list")
    emojisListElement?.scroll(0, 0)
    const allEmojisFromCategory = emojisSortedByCategory.filter(emoji =>
      emoji.category.includes(category)
    )
    setCurrentCategory(category)
    setEmojisFromCategory(allEmojisFromCategory)
  }

  return {
    getEmojisFromCategory,
    emojisList,
    hasMore,
    getMoreEmojis,
    getEmojisCategories,
    defineCategoryIcon,
    currentCategory,
    getAllEmojis
  }
}
