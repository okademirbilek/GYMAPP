import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
const Layout = () => {
  return (
    <div className="layout display-f">
      <Sidebar />
      <div className="container-site">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
