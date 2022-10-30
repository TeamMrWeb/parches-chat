import { useEmojis } from "./useEmojis"
import InfiniteScroll from "react-infinite-scroll-component"
import { Oval } from "react-loader-spinner"

export default function Emojis({ setValue }: { setValue: (value: any) => void }) {
  const {
    getEmoji,
    getEmojiByShortName,
    getEmojiCategory,
    parseText,
    emojisList,
    hasMore,
    getMoreEmojis
  } = useEmojis()

  return (
    <section className="emojis-container">
      <div className="emojis-wrapper">
        <header className="emojis-header">
          <ul className="categories-list">
            <li className="category">
              <span className="category-name">Todos</span>
            </li>
          </ul>
        </header>
        {/* <div
          id="scrollableDiv"
          style={{ height: 250, overflow: "auto", display: "flex", flexDirection: "column" }}
        > */}
        <InfiniteScroll
          dataLength={emojisList.length}
          next={() => getMoreEmojis(emojisList.length)}
          hasMore={hasMore}
          height={250}
          loader={
            <Oval
              height={30}
              width={30}
              color="#dd4ec6"
              wrapperStyle={{}}
              wrapperClass="oval-loader"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#8d4fc9"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          }
          className="emojis-list"
        >
          {emojisList.map((emoji: any, index: number) => (
            <div
              className="emoji"
              key={index}
              onClick={() => setValue((value: string) => value + emoji.emoji)}
            >
              <span className="emoji__emoji">{emoji.emoji}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      {/* </div> */}
    </section>
  )
}
