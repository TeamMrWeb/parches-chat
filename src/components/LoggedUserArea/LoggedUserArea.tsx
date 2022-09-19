import { useSelector } from "react-redux"
import configurationIcon from "../../assets/icons/configuration-icon.svg"
import userDefaultIcon from "../../assets/icons/user-default-icon.svg"

export default function LoggedUserArea() {
  const loggedUser = useSelector((state: any) => state.loggedUser)
  console.log(loggedUser)
  return (
    <div className="logged-user-area">
      <div className="wrapper">
        <img className="logged-user-area__avatar" src={loggedUser.avatar ? loggedUser.avatar : userDefaultIcon} alt="" />
        <span className="logged-user-area__name">{loggedUser?.username}</span>
      </div>
      <button className="configuration">
        <img className="configuration__icon" src={configurationIcon} alt="" />
      </button>
    </div>
  )
}
