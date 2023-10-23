import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Layout from "./pages/Layout"
import "./css/index.css"
import Dashboard from "./pages/Dashboard"
import Exercises from "./pages/Exercises"
import Meal from "./pages/Meal"
import Measurements from "./pages/Measurements"
import Payment from "./pages/Payment"
import Profile from "./pages/Profile"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/meal" element={<Meal />} />
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
