import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"
import Login from "./sections/Login/Login"
import ChatIndex from "./sections/ChatIndex/ChatIndex"

function App() {
  const errorMessage = useSelector((state: any) => state.errorMessage)

  return (
    <div className="App">
      {errorMessage.visible && <ErrorMessage />}
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
    </div>
  )
}

export default App
