import emojis from "./emojis.json";

export const useEmojis = () => {
  /**
   * Gets the emoji value from a emoji object
   * @param emoji_object - The emoji object
   * @returns The emoji value
   */
  const getEmoji = (emoji_object: any) => {
    return emoji_object["emoji"];
  };

  /**
   * Gets a emoji by shortname
   * @param shortname - The shortname of the emoji
   * @param only_object - If true, returns the emoji object, otherwise returns the emoji value
   * @returns The emoji object or the emoji value
   */
  const getEmojiByShortName = (
    shortName: string,
    only_object: Boolean = false
  ) => {
    const emoji = emojis.find((emoji) => emoji.shortname === shortName);
    return only_object ? emoji : getEmoji(emoji);
  };

  /**
   * Parses a string and replaces all shortnames with emojis values
   * @param text - The text to parse
   * @returns The parsed text
   */
  const parseText = (text: string) => {
    const regex = /:[a-zA-Z0-9_]+:/g;
    const matches = text.match(regex);
    if (matches) {
      matches.forEach((match) => {
        const emoji = getEmojiByShortName(match);
        text = text.replace(match, emoji);
      });
    }
    return text;
  };

  /**
   * Gets emojis by category
   * @param category - The category of the emojis
   * @returns The emojis (list of emoji objects)
   */
  const getEmojiCategory = (category: string) => {
    return emojis.filter((emoji) => emoji.category === category);
  };

  return {
    getEmoji,
    getEmojiByShortName,
    getEmojiCategory,
    parseText,
  };
};
