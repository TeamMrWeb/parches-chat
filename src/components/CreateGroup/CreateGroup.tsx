import { ResultProps } from "../../ts/interfaces"
import cameraIcon from "../../assets/icons/camera-icon.svg"
import { useCreateGroup } from "./useCreateGroup"
import { url } from "inspector"

export default function CreateGroup({
  friendsAdded,
  setShowNextStep,
  setShowAddNewGroup,
  setUsersToGroup
}: {
  friendsAdded: any
  setShowNextStep: React.Dispatch<React.SetStateAction<boolean>>
  setShowAddNewGroup: React.Dispatch<React.SetStateAction<boolean>>
  setUsersToGroup: any
}) {
  const { name, setName, avatar, setAvatar, createGroup } = useCreateGroup()

  return (
    <section className="create-group">
      <header className="create-group-header">
        <label className="upload-avatar__button" htmlFor="upload-avatar">
          <img
            className={avatar ? "upload-avatar__avatar" : "upload-avatar__icon"}
            src={avatar ? URL.createObjectURL(avatar) : cameraIcon}
            alt="Subir avatar"
          />
        </label>
        <input
          className="create-group__input-file"
          type="file"
          placeholder="Nuevo grupo"
          id="upload-avatar"
          onChange={e => e.target.files && setAvatar(e.target.files[0])}
        />
        <input
          className="create-group__input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nuevo grupo"
        />
      </header>
      <ul className="results">
        {friendsAdded?.map((result: any) => (
          <li className="results__item" key={result.userId}>
            <div className="left-side">
              <img
                className="results__avatar"
                src={result.avatar.secure_url}
                alt="Avatar de usuario"
              />
              <span className="results__name">{result.username}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          className="button--close"
          onClick={() => {
            setShowNextStep(false)
            setShowAddNewGroup(false)
            setUsersToGroup([])
          }}
        >
          Cancelar
        </button>
        <button className="button" onClick={() => createGroup(friendsAdded, name, avatar)}>
          Crear
        </button>
      </div>
    </section>
  )
}
