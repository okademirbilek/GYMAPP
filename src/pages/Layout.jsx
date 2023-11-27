import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className={`layout display-f ${theme}`}>
      <Sidebar />
      <div className="container-site background text">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
