import addFriendIcon from "../../assets/icons/add-friend-icon.svg"
import { LoggedUserProps, UserProps } from "../../ts/interfaces"

export default function FriendsResults({
  results,
  loggedUser,
  setAction,
  type,
  onChecked
}: {
  results: UserProps[]
  loggedUser: LoggedUserProps
  setAction: any
  type: string
  onChecked?: any
}) {
  return (
    <ul className="results">
      {results?.map((result: UserProps) =>
        result.verified ? (
          <li
            className="results__item"
            key={result.id}
            onClick={() =>
              result.id !== loggedUser.id && setAction && setAction(result.id, result.username)
            }
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
                <img className="results__icon" src={addFriendIcon} alt="Ícono de agregar amigo" />
              ) : (
                "Tú"
              )
            ) : (
              <>
                <label className="toggler-wrapper">
                  <input
                    type="checkbox"
                    onChange={() =>
                      onChecked((checked: any) => [
                        ...checked,
                        {
                          id: result.id,
                          username: result.username,
                          avatar: result.avatar
                        }
                      ])
                    }
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </>
            )}
          </li>
        ) : null
      )}
    </ul>
  )
}
