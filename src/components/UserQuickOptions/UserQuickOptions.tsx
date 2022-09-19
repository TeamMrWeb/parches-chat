import { useNavigate } from "react-router-dom"

export default function UserQuickOptions() {
  const navigate = useNavigate()

  const closeSession = () => {
    localStorage.clear()
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
