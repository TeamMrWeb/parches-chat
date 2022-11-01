import { useEmojis } from "./useEmojis"
import InfiniteScroll from "react-infinite-scroll-component"
import { Oval } from "react-loader-spinner"
import { EmojiProps } from "../../ts/interfaces"
import searchIcon from "../../assets/icons/search-icon.svg"
import houseIcon from "../../assets/icons/house-icon.svg"
import closeIcon from "../../assets/icons/close-icon.svg"

export default function Emojis({ setValue }: { setValue: (value: any) => void }) {
  const {
    getEmojisFromCategory,
    emojisList,
    hasMore,
    getMoreEmojis,
    getEmojisCategories,
    defineCategoryIcon,
    currentCategory,
    getAllEmojis,
    setSearch,
    search
  } = useEmojis()

  return (
    <section className="emojis-container">
      <div className="emojis-wrapper">
        <header className="emojis-search">
          <div className="emojis-search-wrapper">
            <input
              className="emojis-search__input"
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search.length > 0 ? (
              <img
                className="emojis-search__icon--close"
                src={closeIcon}
                alt="Vaciar búsqueda"
                onClick={() => setSearch("")}
              />
            ) : (
              <img className="emojis-search__icon" src={searchIcon} alt="Buscar emoji" />
            )}
          </div>
        </header>
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
          {emojisList.map((emoji: EmojiProps, index: number) => (
            <div
              className="emoji"
              key={index}
              onClick={() => setValue((value: string) => value + emoji.emoji)}
            >
              <span className="emoji__emoji">{emoji.emoji}</span>
            </div>
          ))}
        </InfiniteScroll>
        {search.length <= 0 ? (
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
        ) : null}
      </div>
    </section>
  )
}
