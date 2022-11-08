import { Oval } from "react-loader-spinner"
import { ResultProps } from "../../ts/interfaces"
import { useSearchFriends } from "./useSearchFriends"
import closeIcon from "../../assets/icons/close-icon.svg"
import FriendsResults from "../FriendsResults/FriendsResults"

export default function SearchFriends({
  title,
  showModal,
  type,
  setAction,
  children
}: {
  title: string
  showModal: any
  type: string
  setAction: any
  children?: JSX.Element
}) {
  const { isLoading, results, loggedUser, inputValue, setInputValue } = useSearchFriends()

  return (
    <section className="search-friends-section">
      <header className="search-friends-header">
        <h3 className="search-friends-header__title">{title}</h3>
        <button className="close" onClick={() => showModal(false)}>
          <img className="close__icon" src={closeIcon} alt="Ícono de cerrar ventana" />
        </button>
      </header>
      <input
        className="search-friends-section__input"
        type="text"
        placeholder="Buscar por nombre"
        onChange={e => setInputValue(e.target.value)}
      />
      {results.length <= 0 && children && !isLoading ? children : null}
      {isLoading && inputValue.length >= 1 ? (
        <div className="search-friends-loader-spinner">
          <Oval
            height={50}
            width={50}
            color="#dd4ec6"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#8d4fc9"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </div>
      ) : (
        <FriendsResults
          results={results}
          loggedUser={loggedUser}
          setAction={setAction}
          type="addFriend"
        />
      )}
    </section>
  )
}
