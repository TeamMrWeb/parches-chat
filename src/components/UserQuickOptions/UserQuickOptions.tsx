import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../../slicers/loggedUserSlice"
import { clearChats } from "../../slicers/chatsSlice"
import { closeAlertMessage } from "../../slicers/alertMessageSlice"
import { useApolloClient } from "@apollo/client"

export default function UserQuickOptions() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const client = useApolloClient()

  const closeSession = () => {
    client.clearStore()
    localStorage.clear()
    dispatch(logOut())
    dispatch(clearChats())
    dispatch(closeAlertMessage())
    navigate("/login")
  }

  return (
    <div className="user-quick-options">
      <button className="close-session" onClick={() => closeSession()}>
        <span className="close-session__text">Cerrar sesión</span>
      </button>
    </div>
  )
}
