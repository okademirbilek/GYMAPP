import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
const Layout = () => {
  return (
    <div className="layout display-f bg-primary">
      <Sidebar />
      <div className="Container  flex-6">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
