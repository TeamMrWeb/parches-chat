import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { ShowChatProvider } from "./contexts/ShowChatContext"
import VerifyAccount from "./components/VerifyAccount/VerifyAccount"
import AlertMessage from "./components/AlertMessage/AlertMessage"
import Loader from "./components/Loader/Loader"
import ChatIndex from "./sections/ChatIndex/ChatIndex"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"
import Login from "./sections/Login/Login"

function App() {
  const alertMessage = useSelector((state: any) => state.alertMessage)
  const loader = useSelector((state: any) => state.loader)

  return (
    <div className="App">
      <ShowChatProvider>
        {alertMessage.visible && <AlertMessage />}
        {loader.status && <Loader progress={loader.progress} />}
        <BrowserRouter>
          <Routes>
            <Route path="/accounts/*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="verify/:token" element={<VerifyAccount />} />
            </Route>
            <Route path="/login" element={<Navigate to="/accounts/login" />} />
            <Route path="/register" element={<Navigate to="/accounts/register" />} />
            <Route path="/" element={<Navigate to="/accounts/register" />} />
            <Route path="/chat" element={<ChatIndex />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShowChatProvider>
    </div>
  )
}

export default App
