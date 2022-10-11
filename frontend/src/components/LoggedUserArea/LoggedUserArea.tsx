import { useSelector } from "react-redux"
import configurationIcon from "../../assets/icons/configuration-icon.svg"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"

export default function LoggedUserArea({
  showQuickOptions,
  setShowQuickOptions
}: {
  showQuickOptions: boolean
  setShowQuickOptions: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const loggedUser = useSelector((state: any) => state.loggedUser)

  window.onclick = (event: any) => {
    if (
      showQuickOptions &&
      !document.getElementsByClassName("logged-user-area")[0].contains(event.target) &&
      event.target.className !== "user-quick-options"
    )
      setShowQuickOptions(false)
  }

  return (
    <div className="logged-user-area">
      <div className="wrapper" onClick={() => setShowQuickOptions(!showQuickOptions)}>
        <img className="logged-user-area__avatar" src={loggedUser.avatar ? loggedUser.avatar.secure_url : userDefaultIcon} alt="" />
        <span className="logged-user-area__name">{loggedUser?.username}</span>
      </div>
      <button className="configuration">
        <img className="configuration__icon" src={configurationIcon} alt="" />
      </button>
    </div>
  )
}
