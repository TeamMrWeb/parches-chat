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
import { CategoriesIconProps, EmojiProps } from "../../ts/interfaces"

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
  const [search, setSearch] = useState("")

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

  const getAllEmojis = () => {
    scrollToTop()
    setEmojisFromCategory([])
    setCurrentCategory("")
    setHasMore(true)
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (search === "") setEmojisFromCategory([])
      const searchResult = emojisSortedByCategory.filter(emoji =>
        emoji.name.toLowerCase().includes(search.toLowerCase())
      )
      setEmojisList(searchResult)
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [search])

  /**
   * Gets a emoji by shortname
   * @param shortname - The shortname of the emoji
   * @param only_object - If true, returns the emoji object, otherwise returns the emoji value
   * @returns The emoji object or the emoji value
   */
  const getEmojiByShortName = (shortName: string) =>
    emojis.find(emoji => emoji.shortname === shortName)

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
        if (!emoji) return
        text = text.replace(match, emoji.emoji)
      })
    }
    return text
  }

  const getEmojisFromCategory = (category: string) => {
    scrollToTop()
    const allEmojisFromCategory = emojisSortedByCategory.filter(emoji =>
      emoji.category.includes(category)
    )
    setCurrentCategory(category)
    setEmojisFromCategory(allEmojisFromCategory)
    setHasMore(true)
  }

  const scrollToTop = () => document.querySelector(".emojis-list")?.scroll(0, 0)

  return {
    getEmojisFromCategory,
    emojisList,
    hasMore,
    getMoreEmojis,
    getEmojisCategories,
    defineCategoryIcon,
    currentCategory,
    getAllEmojis,
    setSearch,
    search,
    parseText
  }
}
