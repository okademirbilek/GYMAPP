import { Routes, Route } from "react-router-dom";
import "./css/index.css";
import AuthRequired from "./components/AuthRequired";
import { useAuth } from "./context/AuthContext";

import { AdminProvider } from "./context/AdminContext";

// const adminId = import.meta.env.VITE_REACT_APP_FIREBASE_ADMIN_ID

import BottomNavbar from "./components/BottomNavbar";

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
  AdminMeal,
  AdminMeasurement,
  AdminPayment,
  AdminProfile,
  AdminMemberTracking,
} from "./pages/index";
import TrainingDates from "./pages/TrainingDates";

function App() {
  const { currentUserData } = useAuth();
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
            {currentUserData?.isAdmin && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <AdminProvider>
                      <Dashboard />
                    </AdminProvider>
                  }
                />
                <Route
                  path="/dashboard/:id"
                  element={
                    <AdminProvider>
                      <UserDetail />
                    </AdminProvider>
                  }
                >
                  <Route index element={<AdminProfile />} />
                  <Route
                    path="/dashboard/:id/adminPayment"
                    element={<AdminPayment />}
                  />
                  <Route
                    path="/dashboard/:id/adminMeasurement"
                    element={<AdminMeasurement />}
                  />
                  <Route
                    path="/dashboard/:id/adminMeal"
                    element={<AdminMeal />}
                  />
                  <Route
                    path="/dashboard/:id/adminMemberTracking"
                    element={<AdminMemberTracking />}
                  />
                </Route>
              </>
            )}

            <Route path="/exercises" element={<Exercises />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="/measurements" element={<Measurements />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trainingDates" element={<TrainingDates />} />
          </Route>
        </Route>
      </Routes>
      <BottomNavbar />
    </>
  );
}

export default App;
