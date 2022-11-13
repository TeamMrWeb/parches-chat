import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { ShowChatInfoSidebarProvider } from "./contexts/ShowChatInfoSIdebarContext"
import { ShowSearchMessagesProvider } from "./contexts/ShowSearchMessagesContext"
import { ShowChatProvider } from "./contexts/ShowChatContext"
import { VerifyAccount, AlertMessage, Loader, LoaderSpinner, VerifySession } from "./components"
import EmailVerification from "./sections/EmailVerification/EmailVerification"
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
        <ShowSearchMessagesProvider>
          <ShowChatInfoSidebarProvider>
            {alertMessage.visible && <AlertMessage />}
            {loader.status && <Loader progress={loader.progress} />}
            <HashRouter>
              {loaderSpinner.status && <LoaderSpinner />}
              <Routes>
                <Route path="/accounts/*">
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="emailverification/:email" element={<EmailVerification />} />
                  <Route path="verify/:token" element={<VerifyAccount />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/login" element={<Navigate to="/accounts/login" />} />
                <Route path="/register" element={<Navigate to="/accounts/register" />} />
                <Route path="/" element={<Navigate to="/chat" />} />
                <Route
                  path="/chat"
                  element={
                    <VerifySession>
                      <ChatIndex />
                    </VerifySession>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </ShowChatInfoSidebarProvider>
        </ShowSearchMessagesProvider>
      </ShowChatProvider>
    </div>
  )
}

export default App
