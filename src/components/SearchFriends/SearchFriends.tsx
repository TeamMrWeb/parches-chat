import { Oval } from "react-loader-spinner"
import { ResultProps } from "../../ts/interfaces"
import { useSearchFriends } from "./useSearchFriends"
import closeIcon from "../../assets/icons/close-icon.svg"
import addFriendIcon from "../../assets/icons/add-friend-icon.svg"

export default function SearchFriends({
  title,
  showModal,
  type,
  setAction
}: {
  title: string
  showModal: any
  type: string
  setAction: any
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
        <ul className="results">
          {results?.map((result: ResultProps) =>
            result.verified ? (
              <li
                className="results__item"
                key={result.id}
                onClick={() => result.id !== loggedUser.id && setAction(result.id, result.username)}
                title="Agregar amigo"
              >
                <div className="left-side">
                  <img
                    className="results__avatar"
                    src={result.avatar.secure_url}
                    alt="Avatar de usuario"
                  />
                  <span className="results__name">{result.username}</span>
                </div>
                {type === "addFriend" ? (
                  result.id !== loggedUser.id ? (
                    <img
                      className="results__icon"
                      src={addFriendIcon}
                      alt="Ícono de agregar amigo"
                    />
                  ) : (
                    "Tú"
                  )
                ) : (
                  <div>agregaralgrupo</div>
                )}
              </li>
            ) : null
          )}
        </ul>
      )}
    </section>
  )
}
