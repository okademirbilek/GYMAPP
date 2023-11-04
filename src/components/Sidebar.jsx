import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import DashboardIcon from "@mui/icons-material/Dashboard"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import PaymentsIcon from "@mui/icons-material/Payments"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

import { useAuth } from "../context/AuthContext"

const adminId = import.meta.env.VITE_REACT_APP_FIREBASE_ADMIN_ID

const Sidebar = () => {
  const [error, setError] = useState("")

  const { logout, currentUser } = useAuth()

  const navigate = useNavigate()

  //style for active page
  const activeStyle = {
    backgroundColor: "rgb(17, 17, 17)",
  }

  async function handleLogout() {
    setError(" ")

    await logout()
      .then(navigate("/login"))
      .catch((error) => {
        setError("Failed to log out")
      })
  }

  return (
    <div className="sidebar  flex-1">
      <nav>
        <div className="top display-f  align-center justify-center">
          <span className="logo">Sports & Health</span>
        </div>
        <hr />
        <div className="center  mt-2 ml-2">
          <ul className="pl-2 display-f fd-c">
            {currentUser?.uid === adminId && (
              <>
                <p className="title">Admin</p>
                <li>
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <DashboardIcon />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
              </>
            )}
            {currentUser?.uid !== adminId ? (
              <>
                <p className="title">Lists</p>
                <li>
                  <NavLink
                    to="/"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/exercises"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <FitnessCenterIcon />

                    <span>Exercises</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/meal"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <RestaurantIcon />
                    <span>Meal</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/measurements"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <AccessibilityNewIcon />
                    <span>Measurements</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <PaymentsIcon />
                    <span>Payment</span>
                  </NavLink>
                </li>
                <p className="title">User</p>
                <li>
                  <NavLink
                    to="/profile"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <PersonOutlineOutlinedIcon />
                    <span>Profile</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <p className="title">User</p>
            )}

            <li>
              <ExitToAppOutlinedIcon />
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
        <div className="bottom display-f fd-c ml-2 mt-1">
          <p className="title">Mode</p>
          <div className="colorOption">
            <DarkModeOutlinedIcon />
            <p>Dark</p>
          </div>
          <div className="colorOption">
            <LightModeOutlinedIcon />
            <p>Light</p>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
