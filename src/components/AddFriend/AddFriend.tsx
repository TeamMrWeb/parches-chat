import { Oval } from "react-loader-spinner"
import { useAddFriend } from "./useAddFriend"
import addFriendIcon from "../../assets/icons/add-friend-icon.svg"
import closeIcon from "../../assets/icons/close-icon.svg"

interface Result {
  id: string
  username: string
  avatar: {
    public_id: string
    secure_url: string
  }
  __typename: string
}

export default function AddFriend({
  showAddFriend,
  setShowAddFriend
}: {
  showAddFriend: boolean
  setShowAddFriend: (showAddFriend: boolean) => void
}) {
  const { inputValue, setInputValue, results, isLoading, addFriendToLoggedUser } = useAddFriend()

  return (
    <section className="add-friend-section">
      <header className="add-friend-header">
        <h3 className="add-friend-header__title">Agrega a un amigo por su nombre de usuario</h3>
        <button className="close" onClick={() => setShowAddFriend(!showAddFriend)}>
          <img className="close__icon" src={closeIcon} alt="Ícono de cerrar ventana" />
        </button>
      </header>
      <input
        className="add-friend-section__input"
        type="text"
        placeholder="Buscar por nombre"
        onChange={e => setInputValue(e.target.value)}
      />
      {isLoading && inputValue.length >= 1 ? (
        <div className="add-friend-loader-spinner">
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
          {results?.map((result: Result) => (
            <li className="results__item" key={result.id} onClick={() => addFriendToLoggedUser(result.id, result.username)}>
              <div className="left-side">
                <img className="results__avatar" src={result.avatar.secure_url} alt="Avatar de usuario" />
                <span className="results__name">{result.username}</span>
              </div>
              <img className="results__icon" src={addFriendIcon} alt="Ícono de agregar amigo" />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
