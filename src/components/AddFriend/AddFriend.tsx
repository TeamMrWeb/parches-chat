import { resultKeyNameFromField } from "@apollo/client/utilities"
import { Oval } from "react-loader-spinner"
import { useAddFriend } from "./useAddFriend"
import addFriendIcon from "../../assets/icons/add-friend-icon.svg"

interface Result {
  username: string
  avatar: string
}

export default function AddFriend({
  showAddFriend,
  setShowAddFriend
}: {
  showAddFriend: boolean
  setShowAddFriend: (showAddFriend: boolean) => void
}) {
  const { inputValue, setInputValue, results } = useAddFriend()

  return (
    <section className="add-friend-section">
      <h3 className="add-friend-section__title">Agrega a un amigo por su nombre de usuario</h3>
      <input
        className="add-friend-section__input"
        type="text"
        placeholder="Buscar por nombre"
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue.length >= 2 ? (
        <div className="loader-spinner">
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
          {/* {results.map((result: Result) => (
          ))} */}
          <li className="results__item">
            <div className="left-side">
              <img className="results__avatar" src="https://i.pravatar.cc/150?img=1 " alt="Avatar de usuario" />
              <span className="results__name">ds</span>
            </div>
            <img className="results__icon" src={addFriendIcon} alt="Ícono de agregar amigo" />
          </li>
        </ul>
      )}
    </section>
  )
}
