import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import TodayIcon from "@mui/icons-material/Today";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import { useAuth } from "../../context/AuthContext";

import { useTheme } from "../../context/ThemeContext";

//language
import { withTranslation } from "react-i18next";

// const adminId = import.meta.env.VITE_REACT_APP_FIREBASE_ADMIN_ID

const Sidebar = ({ t }) => {
  const { logout, currentUserData } = useAuth();
  const { theme } = useTheme();
  //language
  // const { t } = useTranslation();

  const navigate = useNavigate();

  //style for active page
  const activeStyle = {
    backgroundColor: theme === "light" ? "#E5E5E5" : "#373a40",
  };

  async function handleLogout() {
    // setError(" ")

    await logout()
      .then(navigate("/login"))
      .catch((error) => {
        setError("Failed to log out");
      });
  }

  return (
    <div className={`sidebar ${theme} background text`}>
      <nav>
        <div className="top display-f  align-center justify-center">
          <span className="logo">Sports & Health</span>
          <span className="logo2">S & H</span>
        </div>
        <hr />
        <div className="center">
          <ul className="display-f fd-c">
            {currentUserData?.isAdmin && (
              <>
                <p className="title">Admin</p>
                <li>
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <DashboardIcon />
                    <span>{t("Dashboard")}</span>
                  </NavLink>
                </li>
              </>
            )}
            {!currentUserData?.isAdmin ? (
              <>
                <p className="title">Lists</p>
                <li>
                  <NavLink
                    to="/"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <HomeIcon />
                    <span>{t("Home")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/exercises"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <FitnessCenterIcon />

                    <span>{t("Exercises")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/meal"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <RestaurantIcon />
                    <span>{t("Meal")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/measurements"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <AccessibilityNewIcon />
                    <span>{t("Measurements")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <PaymentsIcon />
                    <span>{t("Payment")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/trainingDates"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <TodayIcon />
                    <span>{t("Training Dates")}</span>
                  </NavLink>
                </li>
                <p className="title">User</p>
                <li>
                  <NavLink
                    to="/profile"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <PersonOutlineOutlinedIcon />
                    <span>{t("Profile")}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/images"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                  >
                    <PermMediaIcon />
                    <span>{t("Images")}</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <p className="title">{t("User")}</p>
            )}

            <li onClick={handleLogout}>
              <button>
                <ExitToAppOutlinedIcon />
                <p>{t("Log Out")}</p>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withTranslation()(Sidebar);
