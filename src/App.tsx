import { useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"
import Login from "./sections/Login/Login"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"

function App() {
  const [error, setError] = useState(false)

  return (
    <div className="App">
      {error && <ErrorMessage setError={setError} />}
      <BrowserRouter>
        <Routes>
          <Route path="/accounts/*">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/login" element={<Navigate to="/accounts/login" />} />
          <Route path="/register" element={<Navigate to="/accounts/register" />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
