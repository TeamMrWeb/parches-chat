import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { ShowChatProvider } from "./contexts/ShowChatContext"
import { VerifyAccount, AlertMessage, Loader, LoaderSpinner } from "./components"
import ChatIndex from "./sections/ChatIndex/ChatIndex"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"
import Login from "./sections/Login/Login"
import { RootState } from "./ts/interfaces"

function App() {
  const alertMessage = useSelector((state: RootState) => state.alertMessage)
  const loader = useSelector((state: RootState) => state.loader)
  const loaderSpinner = useSelector((state: RootState) => state.loaderSpinner)

  return (
    <div className="App">
      <ShowChatProvider>
        {alertMessage.visible && <AlertMessage />}
        {loader.status && <Loader progress={loader.progress} />}
        {loaderSpinner.status && <LoaderSpinner />}
        <HashRouter>
          <Routes>
            <Route path="/accounts/*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="verify/:token" element={<VerifyAccount />} />
            </Route>
            <Route path="/login" element={<Navigate to="/accounts/login" />} />
            <Route path="/register" element={<Navigate to="/accounts/register" />} />
            <Route path="/" element={<Navigate to="/accounts/login" />} />
            <Route path="/chat" element={<ChatIndex />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </ShowChatProvider>
    </div>
  )
}

export default App
