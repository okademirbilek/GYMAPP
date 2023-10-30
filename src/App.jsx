import { Routes, Route } from "react-router-dom"
import "./css/index.css"
import AuthRequired from "./components/AuthRequired"
import { useAuth } from "./context/AuthContext"

const adminId = import.meta.env.VITE_REACT_APP_FIREBASE_ADMIN_ID

import {
  SignUp,
  Login,
  ForgotPassword,
  Home,
  Layout,
  Dashboard,
  UserDetail,
  Exercises,
  Meal,
  Measurements,
  Payment,
  Profile,
} from "./pages/index"

function App() {
  const { currentUser } = useAuth()
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* you cannot see the pages without authentication */}
          <Route element={<AuthRequired />}>
            {currentUser?.uid === adminId && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<UserDetail />} />
              </>
            )}

            <Route path="/exercises" element={<Exercises />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="/measurements" element={<Measurements />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
