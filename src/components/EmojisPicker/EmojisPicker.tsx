import Picker from "emoji-picker-react"

export default function EmojisPicker({ setValue }: { setValue: any }) {
  const onEmojiClick = (event: any, emojiObject: any) => {
    setValue((value: any) => value + emojiObject.emoji)
  }

  return <Picker onEmojiClick={onEmojiClick} />
}
