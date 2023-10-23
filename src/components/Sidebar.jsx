import React from "react"
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
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
            <p className="title">Lists</p>
            <li>
              <HomeIcon />
              <span>Home</span>
            </li>
            <li>
              <FitnessCenterIcon />
              <span>Exercises</span>
            </li>
            <li>
              <RestaurantIcon />
              <span>Meal</span>
            </li>
            <li>
              <AccessibilityNewIcon />
              <span>Measurements</span>
            </li>
            <li>
              <PaymentsIcon />
              <span>Payment</span>
            </li>
            <p className="title">User</p>
            <li>
              <PersonOutlineOutlinedIcon />
              <span>Profile</span>
            </li>
            <li>
              <ExitToAppOutlinedIcon />
              <span>Logout</span>
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
