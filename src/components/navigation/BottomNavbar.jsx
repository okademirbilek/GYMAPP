import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PaymentsIcon from "@mui/icons-material/Payments";
import TodayIcon from "@mui/icons-material/Today";

import { useAuth } from "../../context/AuthContext";

import { useTheme } from "../../context/ThemeContext";

//style for active page
const activeStyle = {
  color: "rgb(17, 17, 17)",
};

// const adminId = import.meta.env.VITE_REACT_APP_FIREBASE_ADMIN_ID
const BottomNavbar = () => {
  const { currentUserData } = useAuth();
  const { theme } = useTheme();
  return (
    <div className="bottom-navbar">
      <nav className={theme}>
        <ul className="display-f">
          {currentUserData?.isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <DashboardIcon />
                </NavLink>
              </li>
            </>
          )}

          {!currentUserData?.isAdmin && (
            <>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <HomeIcon />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/exercises"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <FitnessCenterIcon />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/meal"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <RestaurantIcon />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/measurements"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <AccessibilityNewIcon />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payment"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <PaymentsIcon />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trainingDates"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  <TodayIcon />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavbar;
