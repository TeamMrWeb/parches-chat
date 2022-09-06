import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ShowChatProvider } from "./contexts/ShowChatContext"
import { useSelector } from "react-redux"
import AlertMessage from "./components/AlertMessage/AlertMessage"
import ChatIndex from "./sections/ChatIndex/ChatIndex"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"
import Login from "./sections/Login/Login"

function App() {
  const alertMessage = useSelector((state: any) => state.alertMessage)

  return (
    <div className="App">
      <ShowChatProvider>
        {alertMessage.visible && <AlertMessage />}
        <BrowserRouter>
          <Routes>
            <Route path="/accounts/*">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/login" element={<Navigate to="/accounts/login" />} />
            <Route path="/register" element={<Navigate to="/accounts/register" />} />
            <Route path="/chat" element={<ChatIndex />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShowChatProvider>
    </div>
  )
}

export default App