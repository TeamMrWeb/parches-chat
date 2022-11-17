import { Oval } from "react-loader-spinner"
import { useSearch } from "../../hooks/useSearch"
import closeIcon from "../../assets/icons/close-icon.svg"
import FriendsResults from "../FriendsResults/FriendsResults"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"

export default function SearchFriends({
  title,
  showModal,
  setAction,
  children,
  type,
  onChecked
}: {
  title: string
  showModal: any
  setAction?: any
  children?: JSX.Element
  type: string
  onChecked?: any
}) {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const { isLoading, results, loggedUser, inputValue, setInputValue } = useSearch(
    getFriendByUsername,
    { variables: { username: "" } }
  )

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
          type={type}
          onChecked={onChecked}
        />
      )}
    </section>
  )
}
