import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Login from "./sections/Login/Login"
import NotFound from "./sections/NotFound/NotFound"
import Register from "./sections/Register/Register"

function App() {
  return (
    <div className="App">
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
