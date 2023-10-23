import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import "./css/index.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
