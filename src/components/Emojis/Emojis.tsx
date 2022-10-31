import { useEmojis } from "./useEmojis"
import InfiniteScroll from "react-infinite-scroll-component"
import { Oval } from "react-loader-spinner"
import houseIcon from "../../assets/icons/house-icon.svg"

export default function Emojis({ setValue }: { setValue: (value: any) => void }) {
  const {
    getEmojisFromCategory,
    emojisList,
    hasMore,
    getMoreEmojis,
    getEmojisCategories,
    defineCategoryIcon,
    currentCategory,
    getAllEmojis
  } = useEmojis()

  return (
    <section className="emojis-container">
      <div className="emojis-wrapper">
        <InfiniteScroll
          dataLength={emojisList.length}
          next={() => {
            getMoreEmojis(emojisList.length)
          }}
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
        <footer className="emojis-footer">
          <ul className="categories-list">
            {getEmojisCategories().map((category, index) => (
              <li
                key={index}
                className={category === currentCategory ? "category active" : "category"}
              >
                <button
                  className="category__button"
                  onClick={() => getEmojisFromCategory(category)}
                >
                  <img
                    className="category__icon"
                    src={defineCategoryIcon(category)}
                    alt={`Categoría ${category}`}
                  />
                </button>
              </li>
            ))}
            <li className={currentCategory === "" ? "category active" : "category"}>
              <button className="category__button" onClick={() => getAllEmojis()}>
                <img className="category__icon" src={houseIcon} alt="Todas las categorías" />
              </button>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  )
}
