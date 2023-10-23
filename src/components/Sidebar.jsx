import React from "react"
import { NavLink } from "react-router-dom"
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

const Sidebar = () => {
  const activeStyle = {
    backgroundColor: "rgb(17, 17, 17)",
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
            <li>
              <NavLink
                to="/logout"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                <ExitToAppOutlinedIcon />
                <span>Logout</span>
              </NavLink>
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
